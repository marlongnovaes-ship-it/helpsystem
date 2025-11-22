import { upsertSiteContent } from './server/db.ts';

const initialContent = [
  { key: 'hero_title', value: 'Suporte Técnico em Informática', label: 'Título Principal', section: 'hero' },
  { key: 'hero_subtitle', value: 'Soluções profissionais para manter seu computador funcionando perfeitamente. Atendimento remoto 24/7 e presencial com hora marcada.', label: 'Subtítulo', section: 'hero' },
  { key: 'services_title', value: 'Nossos Serviços', label: 'Título da Seção de Serviços', section: 'services' },
  { key: 'contact_title', value: 'Solicite Suporte', label: 'Título do Formulário', section: 'contact' },
];

for (const content of initialContent) {
  await upsertSiteContent(content);
  console.log(`✓ ${content.label}`);
}

console.log('\n✓ Conteúdo inicial criado com sucesso!');
process.exit(0);
