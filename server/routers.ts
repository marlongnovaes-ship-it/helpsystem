import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createSupportRequest, getAllSupportRequests, updateSupportRequestStatus, getAllSiteContent, upsertSiteContent, verifyAdminCredentials } from "./db";
import { notifyOwner } from "./_core/notification";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  support: router({
    create: publicProcedure
      .input(z.object({
        name: z.string().min(1, "Nome é obrigatório"),
        email: z.string().email("Email inválido"),
        serviceType: z.enum(["formatacao", "limpeza", "atualizacao", "suporte_remoto"]),
        description: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await createSupportRequest({
          name: input.name,
          email: input.email,
          serviceType: input.serviceType,
          description: input.description,
        });

        // Notificar o proprietário
        await notifyOwner({
          title: "Nova Solicitação de Suporte - HelpSystem",
          content: `Nome: ${input.name}\nEmail: ${input.email}\nServiço: ${input.serviceType}\nDescrição: ${input.description}`,
        });

        return { success: true };
      }),
    
    list: publicProcedure.query(async () => {
      return await getAllSupportRequests();
    }),
  }),

  admin: router({    login: publicProcedure
      .input(z.object({
        username: z.string(),
        password: z.string(),
      }))
      .mutation(async ({ input, ctx }) => {
        const isValid = await verifyAdminCredentials(input.username, input.password);
        if (!isValid) {
          throw new Error("Credenciais inválidas");
        }

        // Criar sessão admin no cookie
        ctx.res.cookie('admin_session', input.username, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 24 * 60 * 60 * 1000, // 24 horas
          sameSite: 'lax',
        });

        return { success: true };
      }),

    logout: publicProcedure.mutation(({ ctx }) => {
      ctx.res.clearCookie('admin_session');
      return { success: true };
    }),

    checkAuth: publicProcedure.query(({ ctx }) => {
      const adminSession = ctx.req.cookies['admin_session'];
      return { isAuthenticated: !!adminSession, username: adminSession || null };
    }),

    getSupportRequests: publicProcedure.query(async ({ ctx }) => {
      const adminSession = ctx.req.cookies['admin_session'];
      if (!adminSession) {
        throw new Error("Não autenticado");
      }
      return await getAllSupportRequests();
    }),

    updateRequestStatus: publicProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["pendente", "em_andamento", "concluido"]),
      }))
      .mutation(async ({ input, ctx }) => {
        const adminSession = ctx.req.cookies['admin_session'];
        if (!adminSession) {
          throw new Error("Não autenticado");
        }
        await updateSupportRequestStatus(input.id, input.status);
        return { success: true };
      }),

    getSiteContent: publicProcedure.query(async ({ ctx }) => {
      const adminSession = ctx.req.cookies['admin_session'];
      if (!adminSession) {
        throw new Error("Não autenticado");
      }
      return await getAllSiteContent();
    }),

    updateSiteContent: publicProcedure
      .input(z.object({
        key: z.string(),
        value: z.string(),
        label: z.string(),
        section: z.string(),
      }))
      .mutation(async ({ input, ctx }) => {
        const adminSession = ctx.req.cookies['admin_session'];
        if (!adminSession) {
          throw new Error("Não autenticado");
        }
        await upsertSiteContent(input);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
