/**
 * TradeOpsVault — 85 Etsy Listing Copy Generator
 * Outputs all titles, descriptions, and tags for:
 * - 20 English individual listings
 * - 20 Spanish individual listings
 * - 20 French individual listings
 * - 20 Portuguese individual listings
 * - 4 language bundles ($9.99 each)
 * - 1 Ultimate Bundle ($34.99)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ─── Listing Master Data ──────────────────────────────────────────────────────
const LISTINGS = [
  { id:'LS-001', trade:'HVAC',             name:'HVAC Service Call Notes',               file:'LS-001-HVAC-Service-Call-Notes-TradeOpsVault.html',
    keywords:['hvac service form','hvac invoice template','air conditioning repair form','hvac technician form','hvac service call sheet'],
    features:['3-page service call form','diagnosis checklist','refrigerant record','parts & labor invoice','job history log'],
    buyer:'HVAC technicians, AC repair companies, heating & cooling contractors' },

  { id:'LS-002', trade:'Plumbing',         name:'Plumbing Dispatch Checklist',            file:'LS-002-Plumbing-Dispatch-Checklist-TradeOpsVault.html',
    keywords:['plumbing invoice template','plumber dispatch form','plumbing service form','plumber job sheet','plumbing work order'],
    features:['dispatch priority system','parts & labor invoice','job history log','customer sign-off','auto-calculating totals'],
    buyer:'Plumbers, plumbing contractors, drain & pipe repair businesses' },

  { id:'LS-003', trade:'Electrician',      name:'Electrician Jobsite Inspection Form',    file:'LS-003-Electrician-Jobsite-Inspection-TradeOpsVault.html',
    keywords:['electrician inspection form','electrical contractor form','electrician invoice','electrical jobsite form','electrician template'],
    features:['hazard assessment checklist','panel & circuit inspection','code violations log','sign-off section','job history tracker'],
    buyer:'Electricians, electrical contractors, home inspection businesses' },

  { id:'LS-004', trade:'Lawn Care',        name:'Lawn Care Weekly Crew Planner',          file:'LS-004-Lawn-Care-Weekly-Crew-Planner-TradeOpsVault.html',
    keywords:['lawn care business form','landscaping invoice template','lawn service schedule','crew planner template','landscaping business form'],
    features:['weekly route planner','crew hour tracker','daily job list','end-of-day summary','client route list'],
    buyer:'Lawn care businesses, landscaping contractors, groundskeeping companies' },

  { id:'LS-005', trade:'Auto Detail',      name:'Auto Detail Intake & Waiver Form',       file:'LS-005-Auto-Detail-Intake-Waiver-TradeOpsVault.html',
    keywords:['auto detail form','car detailing invoice','detailing waiver template','auto detailing intake form','car wash business form'],
    features:['vehicle intake checklist','liability waiver','service selections','pre-existing damage log','customer sign-off'],
    buyer:'Auto detailing businesses, car wash companies, mobile detailers' },

  { id:'LS-006', trade:'Pest Control',     name:'Pest Control Follow-Up Cards',           file:'LS-006-Pest-Control-Follow-Up-Cards-TradeOpsVault.html',
    keywords:['pest control form','exterminator invoice template','pest control service form','pest treatment record','exterminator business form'],
    features:['treatment summary','chemical dosage record','follow-up scheduling','pest type checklist','service invoice'],
    buyer:'Pest control companies, exterminators, fumigation businesses' },

  { id:'LS-007', trade:'Roofing',          name:'Roofing Change Order Approval Form',     file:'LS-007-Roofing-Change-Order-Approval-TradeOpsVault.html',
    keywords:['roofing change order form','roofing contractor template','roofing invoice template','roofing business form','contractor change order'],
    features:['scope of change section','price adjustment','authorization & signature','contract total update','job history log'],
    buyer:'Roofing contractors, construction companies, general contractors' },

  { id:'LS-008', trade:'Pressure Washing', name:'Pressure Washing Route Sheet',           file:'LS-008-Pressure-Washing-Route-Sheet-TradeOpsVault.html',
    keywords:['pressure washing form','power washing invoice','pressure washing business form','power washing route sheet','cleaning contractor form'],
    features:['daily client route list','PSI & detergent log','client sign-off per stop','service invoice','job history tracker'],
    buyer:'Pressure washing businesses, power washing contractors, exterior cleaning companies' },

  { id:'LS-009', trade:'Appliance Repair', name:'Appliance Repair Parts Tracker',         file:'LS-009-Appliance-Repair-Parts-Tracker-TradeOpsVault.html',
    keywords:['appliance repair form','appliance technician invoice','appliance repair tracker','parts order form','appliance business template'],
    features:['parts order log with ETA','supplier tracking','cost summary','service invoice','job history log'],
    buyer:'Appliance repair technicians, appliance service businesses, home repair companies' },

  { id:'LS-010', trade:'Handyman',         name:'Handyman Materials Reimbursement Form',  file:'LS-010-Handyman-Materials-Reimbursement-TradeOpsVault.html',
    keywords:['handyman invoice template','handyman business form','materials reimbursement form','handyman receipt form','home repair invoice'],
    features:['materials purchased log','receipt tracking','auto-calculating totals','labor & invoice total','client sign-off'],
    buyer:'Handymen, home repair businesses, independent contractors' },

  { id:'LS-011', trade:'Mobile Mechanic',  name:'Mobile Mechanic Service Summary',        file:'LS-011-Mobile-Mechanic-Service-Summary-TradeOpsVault.html',
    keywords:['mobile mechanic form','mechanic invoice template','auto repair invoice','mobile mechanic invoice','mechanic service form'],
    features:['vehicle & customer info','parts replaced tracker','OEM vs aftermarket log','labor invoice','job history log'],
    buyer:'Mobile mechanics, auto repair businesses, roadside assistance companies' },

  { id:'LS-012', trade:'Locksmith',        name:'Locksmith Job Authorization Form',       file:'LS-012-Locksmith-Job-Authorization-TradeOpsVault.html',
    keywords:['locksmith invoice template','locksmith job form','locksmith authorization form','locksmith business form','locksmith service record'],
    features:['ID verification section','authorization statement','service invoice','job history tracker','client sign-off'],
    buyer:'Locksmiths, security installation businesses, access control companies' },

  { id:'LS-013', trade:'Painting',         name:'Painting Prep & Final Punch List',       file:'LS-013-Painting-Prep-Final-Punch-List-TradeOpsVault.html',
    keywords:['painting contractor form','painter invoice template','painting punch list','paint contractor checklist','painting business form'],
    features:['surface prep checklist','room-by-room punch list','primer & top coat notes','final walkthrough sign-off','job history log'],
    buyer:'Painting contractors, interior & exterior painters, painting businesses' },

  { id:'LS-014', trade:'Snow Removal',     name:'Snow Removal Service Checklist',         file:'LS-014-Snow-Removal-Service-Checklist-TradeOpsVault.html',
    keywords:['snow removal form','snow plowing invoice','snow removal checklist','winter service form','snow plow business template'],
    features:['trigger conditions log','client route priority list','salt & sand tracker','pre-season equipment check','service invoice'],
    buyer:'Snow removal businesses, landscaping companies with winter services, plow operators' },

  { id:'LS-015', trade:'Window Cleaning',  name:'Window Cleaning Client Packet',          file:'LS-015-Window-Cleaning-Client-Packet-TradeOpsVault.html',
    keywords:['window cleaning form','window washing invoice','window cleaning business form','window cleaner template','cleaning service invoice'],
    features:['client service packet','visit schedule tracker','service type log','client sign-off','job history tracker'],
    buyer:'Window cleaning businesses, commercial cleaning companies, residential cleaners' },

  { id:'LS-016', trade:'Pool Service',     name:'Pool Service Chemical Log',              file:'LS-016-Pool-Service-Chemical-Log-TradeOpsVault.html',
    keywords:['pool service form','pool maintenance log','pool chemical log','pool technician form','swimming pool service form'],
    features:['weekly water chemistry log','chemical dosage record','service invoice','equipment notes','job history tracker'],
    buyer:'Pool service companies, pool maintenance technicians, aquatic facility managers' },

  { id:'LS-017', trade:'Flooring',         name:'Flooring Estimate Scope Matrix',         file:'LS-017-Flooring-Estimate-Scope-Matrix-TradeOpsVault.html',
    keywords:['flooring estimate template','flooring contractor form','flooring invoice template','flooring business form','floor installation estimate'],
    features:['room-by-room scope matrix','auto-calculating sq ft totals','material & labor pricing','estimate total','job history log'],
    buyer:'Flooring contractors, tile installers, hardwood floor businesses, carpet installers' },

  { id:'LS-018', trade:'Contractor',       name:'Contractor Daily Site Report',           file:'LS-018-Contractor-Daily-Site-Report-TradeOpsVault.html',
    keywords:['contractor daily report','construction site report','contractor form template','daily site log','construction daily report'],
    features:['crew roster & hours','materials used log','delays & safety notes','end-of-day summary','next day plan'],
    buyer:'General contractors, construction site managers, subcontractors, project managers' },

  { id:'LS-019', trade:'Septic',           name:'Septic Service Pump Log',                file:'LS-019-Septic-Service-Pump-Log-TradeOpsVault.html',
    keywords:['septic service form','septic pump log','septic technician form','septic service invoice','septic business template'],
    features:['pump log with manifest #','waste disposal tracking','tank details','service invoice','job history log'],
    buyer:'Septic service companies, waste management businesses, environmental service contractors' },

  { id:'LS-020', trade:'Service Business', name:'Service Fee Transparency Addendum',      file:'LS-020-Service-Fee-Transparency-Addendum-TradeOpsVault.html',
    keywords:['service fee form','contractor fee schedule','service pricing form','business fee template','contractor pricing form'],
    features:['current fee schedule','accepted payment methods','payment terms','client acknowledgment','compliance section'],
    buyer:'Any service business, contractors, trade professionals adding fee transparency to contracts' },
];

// ─── Language Config ──────────────────────────────────────────────────────────
const LANG = {
  en: {
    code: 'en', name: 'English', flag: '🇺🇸',
    digitalDownload: 'Instant Digital Download',
    browserFillable: 'Browser Fillable · Print to PDF · No Software',
    aiPowered: 'AI-Powered · Smart Auto-Calculating · 4 Languages',
    urlParam: '',
    descIntro: (l) => `Professional ${l.trade} business form — fillable directly in your browser, print as PDF, no software required. Trusted by thousands of trade professionals.`,
    descAI: `✦ AI-POWERED: Hit "Analyze with AI" after filling the form for instant professional feedback, diagnosis suggestions, and recommendations — powered by Claude AI. Includes 5 free analyses per month. Upgrade to TradeOpsVault Pro at $14.99/mo for unlimited AI + CRM access.`,
    descSmart: `⚡ SMART TEMPLATES: Auto-calculates invoice totals, labor costs, and materials in real time. Remembers your company name, technician, and license number across sessions — never retype your business info.`,
    descExport: `📊 EXPORT & INTEGRATE: Download your completed form as a CSV file (free), connect to Zapier to send job data directly to Google Sheets, HubSpot, QuickBooks, or 5,000+ other apps (Pro), or save to the TradeOpsVault CRM dashboard (Pro).`,
    descLanguages: `🌐 4 LANGUAGES INCLUDED: Switch between English, Español, Français, and Português with one click. Perfect for bilingual crews and international businesses.`,
    descHow: `HOW IT WORKS:\n1. Open the HTML file in Chrome or Safari\n2. Click any field and start typing — your business info is remembered\n3. Fill the form — invoice totals calculate automatically\n4. Hit "Analyze with AI" for instant professional analysis\n5. Click "Print / Save PDF" — done`,
    descWhat: (l) => `WHAT YOU GET:\n✓ ${l.features.join('\n✓ ')}\n✓ AI analysis button\n✓ Export to CSV / Zapier / CRM\n✓ 4 languages (EN/ES/FR/PT)\n✓ Smart auto-calculating fields\n✓ Unlimited prints & reprints\n✓ Instant download — use today`,
    descPerfectFor: (l) => `PERFECT FOR: ${l.buyer}`,
    descFooter: `TradeOpsVault · tradeopsvault.com · Professional Trade Business Templates`,
    tags: (l) => [
      ...l.keywords.slice(0,5),
      'digital download','fillable pdf form','small business form',
      'printable template','contractor template','trades business form',
      'instant download','auto repair form'
    ].slice(0,13).map(t => t.slice(0,20)),
  },

  es: {
    code: 'es', name: 'Español', flag: '🇲🇽',
    digitalDownload: 'Descarga Digital Instantánea',
    browserFillable: 'Rellenable en Navegador · Imprimir como PDF · Sin Software',
    aiPowered: 'Con Inteligencia Artificial · Cálculo Automático · 4 Idiomas',
    urlParam: '?lang=es',
    descIntro: (l) => `Formulario profesional para negocios de ${l.tradeEs} — se rellena directamente en tu navegador, imprime como PDF, sin necesidad de software. Confiado por miles de profesionales del sector.`,
    descAI: `✦ CON INTELIGENCIA ARTIFICIAL: Presiona "Analizar con IA" después de llenar el formulario para obtener retroalimentación profesional, sugerencias de diagnóstico y recomendaciones al instante — impulsado por Claude AI. Incluye 5 análisis gratuitos por mes.`,
    descSmart: `⚡ PLANTILLA INTELIGENTE: Calcula automáticamente totales de factura, costos de mano de obra y materiales en tiempo real. Recuerda el nombre de tu empresa, técnico y número de licencia.`,
    descExport: `📊 EXPORTAR E INTEGRAR: Descarga como CSV (gratis), conecta con Zapier para enviar datos a Google Sheets, QuickBooks y más de 5,000 aplicaciones (Pro).`,
    descLanguages: `🌐 4 IDIOMAS INCLUIDOS: Cambia entre Español, English, Français y Português con un solo clic.`,
    descHow: `CÓMO FUNCIONA:\n1. Abre el archivo HTML en Chrome o Safari\n2. Haz clic en cualquier campo y empieza a escribir\n3. Rellena el formulario — los totales se calculan automáticamente\n4. Haz clic en "Analizar con IA" para análisis profesional\n5. Haz clic en "Imprimir / Guardar PDF" — listo`,
    descWhat: (l) => `QUÉ INCLUYE:\n✓ ${l.featuresEs.join('\n✓ ')}\n✓ Botón de análisis con IA\n✓ Exportar a CSV / Zapier / CRM\n✓ 4 idiomas (ES/EN/FR/PT)\n✓ Cálculo automático inteligente\n✓ Impresiones ilimitadas\n✓ Descarga instantánea — úsalo hoy`,
    descPerfectFor: (l) => `IDEAL PARA: ${l.buyerEs}`,
    descFooter: `TradeOpsVault · tradeopsvault.com · Plantillas Profesionales para Negocios de Servicios`,
    tags: (l) => [
      ...l.keywordsEs,
      'formulario digital','descarga instantánea','plantilla negocio',
      'formulario imprimible','contratista plantilla','formulario servicio'
    ].slice(0,13).map(t => t.slice(0,20)),
  },

  fr: {
    code: 'fr', name: 'Français', flag: '🇫🇷',
    digitalDownload: 'Téléchargement numérique instantané',
    browserFillable: 'Remplissable dans le navigateur · Imprimer en PDF · Sans logiciel',
    aiPowered: 'Alimenté par IA · Calcul automatique · 4 langues',
    urlParam: '?lang=fr',
    descIntro: (l) => `Formulaire professionnel pour les entreprises de ${l.tradeFr} — à remplir directement dans votre navigateur, à imprimer en PDF, sans logiciel requis.`,
    descAI: `✦ INTELLIGENCE ARTIFICIELLE: Cliquez sur "Analyser avec l'IA" après avoir rempli le formulaire pour obtenir des commentaires professionnels, des suggestions de diagnostic et des recommandations instantanées.`,
    descSmart: `⚡ MODÈLE INTELLIGENT: Calcule automatiquement les totaux de facture, les coûts de main-d'œuvre et les matériaux en temps réel. Mémorise le nom de votre entreprise, le technicien et le numéro de licence.`,
    descExport: `📊 EXPORTER ET INTÉGRER: Téléchargez en CSV (gratuit), connectez avec Zapier pour envoyer les données vers Google Sheets, QuickBooks et plus de 5 000 applications (Pro).`,
    descLanguages: `🌐 4 LANGUES INCLUSES: Passez entre Français, English, Español et Português en un clic. Idéal pour les équipes bilingues au Canada.`,
    descHow: `COMMENT ÇA MARCHE:\n1. Ouvrez le fichier HTML dans Chrome ou Safari\n2. Cliquez sur un champ et commencez à taper\n3. Remplissez le formulaire — les totaux se calculent automatiquement\n4. Cliquez sur "Analyser avec l'IA" pour une analyse professionnelle\n5. Cliquez sur "Imprimer / Sauvegarder PDF" — terminé`,
    descWhat: (l) => `CE QUE VOUS OBTENEZ:\n✓ ${l.featuresFr.join('\n✓ ')}\n✓ Bouton d'analyse IA\n✓ Export CSV / Zapier / CRM\n✓ 4 langues (FR/EN/ES/PT)\n✓ Calcul automatique intelligent\n✓ Impressions illimitées\n✓ Téléchargement instantané`,
    descPerfectFor: (l) => `IDÉAL POUR: ${l.buyerFr}`,
    descFooter: `TradeOpsVault · tradeopsvault.com · Modèles professionnels pour entreprises de services`,
    tags: (l) => [
      ...l.keywordsFr,
      'formulaire numérique','téléchargement pdf','modèle entreprise',
      'formulaire imprimable','entrepreneur modèle','facture service'
    ].slice(0,13).map(t => t.slice(0,20)),
  },

  pt: {
    code: 'pt', name: 'Português', flag: '🇧🇷',
    digitalDownload: 'Download Digital Instantâneo',
    browserFillable: 'Preenchível no Navegador · Imprimir como PDF · Sem Software',
    aiPowered: 'Com Inteligência Artificial · Cálculo Automático · 4 Idiomas',
    urlParam: '?lang=pt',
    descIntro: (l) => `Formulário profissional para empresas de ${l.tradePt} — preenchível diretamente no navegador, imprima como PDF, sem necessidade de software.`,
    descAI: `✦ INTELIGÊNCIA ARTIFICIAL: Clique em "Analisar com IA" após preencher o formulário para obter feedback profissional, sugestões de diagnóstico e recomendações instantâneas — com tecnologia Claude AI.`,
    descSmart: `⚡ MODELO INTELIGENTE: Calcula automaticamente totais de fatura, custos de mão de obra e materiais em tempo real. Memoriza o nome da sua empresa, técnico e número de licença.`,
    descExport: `📊 EXPORTAR E INTEGRAR: Baixe como CSV (grátis), conecte com Zapier para enviar dados ao Google Sheets, QuickBooks e mais de 5.000 aplicativos (Pro).`,
    descLanguages: `🌐 4 IDIOMAS INCLUÍDOS: Alterne entre Português, English, Español e Français com um clique.`,
    descHow: `COMO FUNCIONA:\n1. Abra o arquivo HTML no Chrome ou Safari\n2. Clique em qualquer campo e comece a digitar\n3. Preencha o formulário — os totais são calculados automaticamente\n4. Clique em "Analisar com IA" para análise profissional\n5. Clique em "Imprimir / Salvar PDF" — pronto`,
    descWhat: (l) => `O QUE VOCÊ RECEBE:\n✓ ${l.featuresPt.join('\n✓ ')}\n✓ Botão de análise com IA\n✓ Exportar para CSV / Zapier / CRM\n✓ 4 idiomas (PT/EN/ES/FR)\n✓ Cálculo automático inteligente\n✓ Impressões ilimitadas\n✓ Download instantâneo — use hoje`,
    descPerfectFor: (l) => `IDEAL PARA: ${l.buyerPt}`,
    descFooter: `TradeOpsVault · tradeopsvault.com · Modelos Profissionais para Empresas de Serviços`,
    tags: (l) => [
      ...l.keywordsPt,
      'formulário digital','download instantâneo','modelo negócio',
      'formulário imprimível','contratante modelo','fatura serviço'
    ].slice(0,13).map(t => t.slice(0,20)),
  },
};

// ─── Per-listing trade translations ──────────────────────────────────────────
const TRADE_TRANSLATIONS = {
  'LS-001': {
    tradeEs:'HVAC y Aire Acondicionado', tradeFr:'CVC (Chauffage, Ventilation, Climatisation)', tradePt:'HVAC e Ar Condicionado',
    keywordsEs:['formulario hvac','plantilla hvac','formulario tecnico hvac','formulario aire acondicionado','formulario servicio hvac'],
    keywordsFr:['formulaire cvc','formulaire hvac','modèle technicien cvc','formulaire climatisation','formulaire service hvac'],
    keywordsPt:['formulário hvac','modelo hvac','formulário técnico hvac','formulário ar condicionado','formulário serviço hvac'],
    featuresEs:['Formulario de 3 páginas','Lista de diagnóstico','Registro de refrigerante','Factura de partes y mano de obra','Historial de trabajos'],
    featuresFr:['Formulaire 3 pages','Liste de diagnostic','Registre de réfrigérant','Facture pièces et main-d\'œuvre','Journal des travaux'],
    featuresPt:['Formulário de 3 páginas','Lista de diagnóstico','Registro de refrigerante','Fatura de peças e mão de obra','Histórico de trabalhos'],
    buyerEs:'Técnicos de HVAC, empresas de reparación de AC, contratistas de calefacción y refrigeración',
    buyerFr:'Techniciens CVC, entreprises de réparation de climatisation, entrepreneurs en chauffage et climatisation',
    buyerPt:'Técnicos de HVAC, empresas de reparo de AC, contratantes de aquecimento e refrigeração',
  },
  'LS-002': {
    tradeEs:'Plomería', tradeFr:'Plomberie', tradePt:'Encanamento',
    keywordsEs:['formulario plomeria','plantilla plomero','formulario servicio plomeria','orden trabajo plomero','factura plomeria'],
    keywordsFr:['formulaire plomberie','modèle plombier','formulaire service plomberie','bon travail plombier','facture plomberie'],
    keywordsPt:['formulário encanamento','modelo encanador','formulário serviço encanamento','ordem serviço encanador','fatura encanamento'],
    featuresEs:['Sistema de prioridad de despacho','Factura de partes y mano de obra','Historial de trabajos','Firma del cliente','Totales automáticos'],
    featuresFr:['Système de priorité de répartition','Facture pièces et main-d\'œuvre','Journal des travaux','Signature client','Totaux automatiques'],
    featuresPt:['Sistema de prioridade de despacho','Fatura de peças e mão de obra','Histórico de trabalhos','Assinatura do cliente','Totais automáticos'],
    buyerEs:'Plomeros, contratistas de plomería, empresas de reparación de tuberías y drenajes',
    buyerFr:'Plombiers, entrepreneurs en plomberie, entreprises de réparation de canalisations',
    buyerPt:'Encanadores, empreiteiros de encanamento, empresas de reparo de tubulações e drenagens',
  },
  'LS-003': {
    tradeEs:'Electricidad', tradeFr:'Électricité', tradePt:'Elétrica',
    keywordsEs:['formulario electricista','plantilla electricista','formulario inspeccion electrica','formulario contratista electrico','factura electricista'],
    keywordsFr:['formulaire électricien','modèle électricien','formulaire inspection électrique','formulaire entrepreneur électrique','facture électricien'],
    keywordsPt:['formulário eletricista','modelo eletricista','formulário inspeção elétrica','formulário contratante elétrico','fatura eletricista'],
    featuresEs:['Lista de evaluación de riesgos','Inspección de tablero y circuitos','Registro de violaciones de código','Sección de aprobación','Historial de trabajos'],
    featuresFr:['Liste d\'évaluation des risques','Inspection tableau et circuits','Registre violations de code','Section de validation','Journal des travaux'],
    featuresPt:['Lista de avaliação de riscos','Inspeção de painel e circuitos','Registro de violações de código','Seção de aprovação','Histórico de trabalhos'],
    buyerEs:'Electricistas, contratistas eléctricos, empresas de inspección de viviendas',
    buyerFr:'Électriciens, entrepreneurs électriques, entreprises d\'inspection résidentielle',
    buyerPt:'Eletricistas, empreiteiros elétricos, empresas de inspeção residencial',
  },
  'LS-004': {
    tradeEs:'Cuidado de Césped y Jardinería', tradeFr:'Entretien de pelouse et paysagement', tradePt:'Cuidado de Gramado e Paisagismo',
    keywordsEs:['formulario jardineria','plantilla cuidado cesped','factura paisajismo','planificador cuadrilla jardineria','formulario negocio jardineria'],
    keywordsFr:['formulaire entretien pelouse','modèle paysagement','facture jardinage','planificateur équipe jardinage','formulaire entreprise jardinage'],
    keywordsPt:['formulário jardinagem','modelo cuidado gramado','fatura paisagismo','planejador equipe jardinagem','formulário negócio jardinagem'],
    featuresEs:['Planificador de ruta semanal','Seguimiento de horas de cuadrilla','Lista de trabajos del día','Resumen de fin del día','Lista de ruta de clientes'],
    featuresFr:['Planificateur d\'itinéraire hebdomadaire','Suivi heures équipe','Liste travaux quotidiens','Résumé fin de journée','Liste itinéraire clients'],
    featuresPt:['Planejador de rota semanal','Rastreamento de horas da equipe','Lista de trabalhos do dia','Resumo do fim do dia','Lista de rota de clientes'],
    buyerEs:'Empresas de cuidado de césped, contratistas de paisajismo, empresas de mantenimiento de jardines',
    buyerFr:'Entreprises d\'entretien de pelouse, entrepreneurs paysagistes, entreprises d\'entretien de jardins',
    buyerPt:'Empresas de cuidado de gramado, empreiteiros paisagistas, empresas de manutenção de jardins',
  },
  'LS-005': {
    tradeEs:'Detallado de Autos', tradeFr:'Détailing automobile', tradePt:'Detalhamento Automotivo',
    keywordsEs:['formulario detallado autos','factura detallado auto','exencion responsabilidad detallado','formulario lavado autos','formulario taller detallado'],
    keywordsFr:['formulaire détailing auto','facture détailing','décharge responsabilité détailing','formulaire lavage auto','modèle carrosserie détailing'],
    keywordsPt:['formulário detalhamento auto','fatura detalhamento','isenção responsabilidade detalhamento','formulário lavagem auto','modelo estética automotiva'],
    featuresEs:['Lista de recepción del vehículo','Exención de responsabilidad','Selecciones de servicio','Registro de daños preexistentes','Aprobación del cliente'],
    featuresFr:['Liste réception véhicule','Décharge de responsabilité','Sélections de service','Journal dommages préexistants','Approbation client'],
    featuresPt:['Lista de recepção do veículo','Isenção de responsabilidade','Seleções de serviço','Registro de danos pré-existentes','Aprovação do cliente'],
    buyerEs:'Negocios de detallado de autos, lavados de autos, detalladores móviles',
    buyerFr:'Entreprises de détailing automobile, lavages automatiques, détailleurs mobiles',
    buyerPt:'Empresas de detalhamento de autos, lava-rápidos, detalhadores móveis',
  },
  'LS-006': {
    tradeEs:'Control de Plagas', tradeFr:'Lutte antiparasitaire', tradePt:'Controle de Pragas',
    keywordsEs:['formulario control plagas','factura exterminador','registro tratamiento plagas','formulario fumigacion','formulario negocio control plagas'],
    keywordsFr:['formulaire lutte antiparasitaire','facture exterminateur','registre traitement parasites','formulaire fumigation','modèle entreprise antiparasitaire'],
    keywordsPt:['formulário controle pragas','fatura dedetização','registro tratamento pragas','formulário fumigação','modelo negócio controle pragas'],
    featuresEs:['Resumen del tratamiento','Registro de dosis química','Programación de seguimiento','Lista de tipo de plagas','Factura de servicio'],
    featuresFr:['Résumé du traitement','Registre dosage chimique','Planification suivi','Liste types de parasites','Facture de service'],
    featuresPt:['Resumo do tratamento','Registro de dosagem química','Agendamento de acompanhamento','Lista de tipo de pragas','Fatura de serviço'],
    buyerEs:'Empresas de control de plagas, exterminadores, empresas de fumigación',
    buyerFr:'Entreprises de lutte antiparasitaire, exterminateurs, entreprises de fumigation',
    buyerPt:'Empresas de controle de pragas, dedetizadoras, empresas de fumigação',
  },
  'LS-007': {
    tradeEs:'Techado y Construcción', tradeFr:'Toiture et construction', tradePt:'Telhamento e Construção',
    keywordsEs:['formulario orden cambio techado','plantilla contratista techado','factura techado','formulario negocio techado','orden cambio construccion'],
    keywordsFr:['formulaire ordre modification toiture','modèle entrepreneur toiture','facture toiture','formulaire entreprise toiture','ordre modification construction'],
    keywordsPt:['formulário ordem mudança telhamento','modelo contratante telhamento','fatura telhamento','formulário negócio telhamento','ordem mudança construção'],
    featuresEs:['Sección de alcance del cambio','Ajuste de precio','Autorización y firma','Actualización del total del contrato','Historial de trabajos'],
    featuresFr:['Section portée du changement','Ajustement du prix','Autorisation et signature','Mise à jour total du contrat','Journal des travaux'],
    featuresPt:['Seção de escopo da mudança','Ajuste de preço','Autorização e assinatura','Atualização do total do contrato','Histórico de trabalhos'],
    buyerEs:'Contratistas de techado, empresas de construcción, contratistas generales',
    buyerFr:'Entrepreneurs en toiture, entreprises de construction, entrepreneurs généraux',
    buyerPt:'Empreiteiros de telhamento, empresas de construção, empreiteiros gerais',
  },
  'LS-008': {
    tradeEs:'Lavado a Presión', tradeFr:'Nettoyage haute pression', tradePt:'Lavagem a Pressão',
    keywordsEs:['formulario lavado presion','factura lavado presion','hoja ruta lavado presion','formulario limpieza exterior','formulario negocio lavado'],
    keywordsFr:['formulaire nettoyage haute pression','facture nettoyage pression','feuille route nettoyage','formulaire nettoyage extérieur','modèle entreprise lavage'],
    keywordsPt:['formulário lavagem pressão','fatura lavagem pressão','folha rota lavagem pressão','formulário limpeza exterior','modelo negócio lavagem'],
    featuresEs:['Lista de ruta de clientes','Registro de PSI y detergente','Aprobación del cliente por parada','Factura de servicio','Historial de trabajos'],
    featuresFr:['Liste itinéraire clients','Registre PSI et détergent','Approbation client par arrêt','Facture de service','Journal des travaux'],
    featuresPt:['Lista de rota de clientes','Registro de PSI e detergente','Aprovação do cliente por parada','Fatura de serviço','Histórico de trabalhos'],
    buyerEs:'Empresas de lavado a presión, contratistas de limpieza exterior',
    buyerFr:'Entreprises de nettoyage haute pression, entrepreneurs nettoyage extérieur',
    buyerPt:'Empresas de lavagem a pressão, empreiteiros de limpeza exterior',
  },
  'LS-009': {
    tradeEs:'Reparación de Electrodomésticos', tradeFr:'Réparation d\'appareils électroménagers', tradePt:'Reparo de Eletrodomésticos',
    keywordsEs:['formulario reparacion electrodomesticos','factura tecnico electrodomesticos','seguimiento piezas electrodomesticos','formulario taller reparacion','plantilla servicio electrodomesticos'],
    keywordsFr:['formulaire réparation appareils','facture technicien électroménager','suivi pièces appareils','formulaire atelier réparation','modèle service électroménager'],
    keywordsPt:['formulário reparo eletrodomésticos','fatura técnico eletrodomésticos','rastreamento peças eletrodomésticos','formulário oficina reparo','modelo serviço eletrodomésticos'],
    featuresEs:['Registro de pedido de piezas con ETA','Seguimiento de proveedor','Resumen de costos','Factura de servicio','Historial de trabajos'],
    featuresFr:['Journal commande pièces avec ETA','Suivi fournisseur','Résumé des coûts','Facture de service','Journal des travaux'],
    featuresPt:['Registro de pedido de peças com prazo','Rastreamento de fornecedor','Resumo de custos','Fatura de serviço','Histórico de trabalhos'],
    buyerEs:'Técnicos de reparación de electrodomésticos, empresas de servicio de aparatos',
    buyerFr:'Techniciens réparation électroménager, entreprises service appareils',
    buyerPt:'Técnicos de reparo de eletrodomésticos, empresas de serviço de aparelhos',
  },
  'LS-010': {
    tradeEs:'Mantenimiento del Hogar', tradeFr:'Bricolage et réparation résidentielle', tradePt:'Manutenção Residencial',
    keywordsEs:['formulario mantenimiento hogar','factura manitas','formulario reembolso materiales','recibo contratista independiente','plantilla reparacion hogar'],
    keywordsFr:['formulaire bricolage','facture homme à tout faire','formulaire remboursement matériaux','reçu entrepreneur indépendant','modèle réparation maison'],
    keywordsPt:['formulário manutenção residencial','fatura faz-tudo','formulário reembolso materiais','recibo empreiteiro independente','modelo reparo residencial'],
    featuresEs:['Registro de materiales comprados','Seguimiento de recibos','Totales automáticos','Total de mano de obra y factura','Aprobación del cliente'],
    featuresFr:['Journal matériaux achetés','Suivi des reçus','Totaux automatiques','Total main-d\'œuvre et facture','Approbation client'],
    featuresPt:['Registro de materiais comprados','Rastreamento de recibos','Totais automáticos','Total de mão de obra e fatura','Aprovação do cliente'],
    buyerEs:'Personas de mantenimiento, negocios de reparación del hogar, contratistas independientes',
    buyerFr:'Hommes à tout faire, entreprises réparation maison, entrepreneurs indépendants',
    buyerPt:'Faz-tudo, empresas de reparo residencial, empreiteiros independentes',
  },
  'LS-011': {
    tradeEs:'Mecánica Móvil', tradeFr:'Mécanicien mobile', tradePt:'Mecânico Móvel',
    keywordsEs:['formulario mecanico movil','factura reparacion auto','formulario servicio automovil','factura mecanico movil','formulario taller movil'],
    keywordsFr:['formulaire mécanicien mobile','facture réparation auto','formulaire service automobile','facture mécanicien mobile','formulaire atelier mobile'],
    keywordsPt:['formulário mecânico móvel','fatura reparo auto','formulário serviço automóvel','fatura mecânico móvel','formulário oficina móvel'],
    featuresEs:['Info de vehículo y cliente','Seguimiento de piezas reemplazadas','Registro OEM vs aftermarket','Factura de mano de obra','Historial de trabajos'],
    featuresFr:['Info véhicule et client','Suivi pièces remplacées','Registre OEM vs après-vente','Facture de main-d\'œuvre','Journal des travaux'],
    featuresPt:['Info de veículo e cliente','Rastreamento de peças substituídas','Registro OEM vs aftermarket','Fatura de mão de obra','Histórico de trabalhos'],
    buyerEs:'Mecánicos móviles, talleres de reparación de autos, empresas de asistencia en carretera',
    buyerFr:'Mécaniciens mobiles, ateliers de réparation automobile, services de dépannage',
    buyerPt:'Mecânicos móveis, oficinas de reparo de autos, empresas de assistência em estrada',
  },
  'LS-012': {
    tradeEs:'Cerrajería', tradeFr:'Serrurerie', tradePt:'Chaveiro',
    keywordsEs:['formulario cerrajero','factura cerrajero','formulario autorizacion cerrajero','formulario negocio cerrajeria','plantilla servicio cerrajero'],
    keywordsFr:['formulaire serrurier','facture serrurier','formulaire autorisation serrurier','formulaire entreprise serrurerie','modèle service serrurier'],
    keywordsPt:['formulário chaveiro','fatura chaveiro','formulário autorização chaveiro','formulário negócio chaveiro','modelo serviço chaveiro'],
    featuresEs:['Sección de verificación de identidad','Declaración de autorización','Factura de servicio','Historial de trabajos','Aprobación del cliente'],
    featuresFr:['Section vérification d\'identité','Déclaration d\'autorisation','Facture de service','Journal des travaux','Approbation client'],
    featuresPt:['Seção de verificação de identidade','Declaração de autorização','Fatura de serviço','Histórico de trabalhos','Aprovação do cliente'],
    buyerEs:'Cerrajeros, empresas de instalación de seguridad, empresas de control de acceso',
    buyerFr:'Serruriers, entreprises d\'installation de sécurité, sociétés de contrôle d\'accès',
    buyerPt:'Chaveiros, empresas de instalação de segurança, empresas de controle de acesso',
  },
  'LS-013': {
    tradeEs:'Pintura', tradeFr:'Peinture en bâtiment', tradePt:'Pintura',
    keywordsEs:['formulario pintor contratista','factura pintura','lista pendientes pintura','formulario empresa pintura','plantilla contratista pintura'],
    keywordsFr:['formulaire peintre entrepreneur','facture peinture','liste travaux restants peinture','formulaire entreprise peinture','modèle entrepreneur peinture'],
    keywordsPt:['formulário pintor empreiteiro','fatura pintura','lista pendências pintura','formulário empresa pintura','modelo empreiteiro pintura'],
    featuresEs:['Lista de preparación de superficie','Lista de pendientes por habitación','Notas de imprimante y capa final','Aprobación final','Historial de trabajos'],
    featuresFr:['Liste préparation surface','Liste travaux restants par pièce','Notes d\'apprêt et finition','Validation finale','Journal des travaux'],
    featuresPt:['Lista de preparação de superfície','Lista de pendências por cômodo','Notas de primer e acabamento','Aprovação final','Histórico de trabalhos'],
    buyerEs:'Contratistas de pintura, pintores de interiores y exteriores, empresas de pintura',
    buyerFr:'Entrepreneurs en peinture, peintres intérieurs et extérieurs, entreprises de peinture',
    buyerPt:'Empreiteiros de pintura, pintores de interiores e exteriores, empresas de pintura',
  },
  'LS-014': {
    tradeEs:'Remoción de Nieve', tradeFr:'Déneigement', tradePt:'Remoção de Neve',
    keywordsEs:['formulario remocion nieve','factura retiro nieve','lista verificacion nieve','formulario arado nieve','plantilla servicio invierno'],
    keywordsFr:['formulaire déneigement','facture déneigement','liste contrôle déneigement','formulaire chasse-neige','modèle service hivernal'],
    keywordsPt:['formulário remoção neve','fatura remoção neve','lista verificação neve','formulário arado neve','modelo serviço invernal'],
    featuresEs:['Registro de condiciones de activación','Lista de prioridad de ruta de clientes','Seguimiento de sal y arena','Revisión pre-temporada de equipos','Factura de servicio'],
    featuresFr:['Registre conditions de déclenchement','Liste priorité itinéraire clients','Suivi sel et sable','Vérification équipement pré-saison','Facture de service'],
    featuresPt:['Registro de condições de ativação','Lista de prioridade de rota de clientes','Rastreamento de sal e areia','Verificação pré-temporada de equipamentos','Fatura de serviço'],
    buyerEs:'Empresas de remoción de nieve, empresas de paisajismo con servicios de invierno, operadores de quitanieves',
    buyerFr:'Entreprises de déneigement, entreprises paysagement avec services hivernaux, opérateurs de chasse-neige',
    buyerPt:'Empresas de remoção de neve, empresas de paisagismo com serviços de inverno, operadores de arado de neve',
  },
  'LS-015': {
    tradeEs:'Limpieza de Ventanas', tradeFr:'Nettoyage de vitres', tradePt:'Limpeza de Janelas',
    keywordsEs:['formulario limpieza ventanas','factura lavado ventanas','formulario empresa limpieza ventanas','plantilla limpiador ventanas','formulario servicio limpieza'],
    keywordsFr:['formulaire nettoyage vitres','facture lavage vitres','formulaire entreprise nettoyage vitres','modèle nettoyeur vitres','formulaire service nettoyage'],
    keywordsPt:['formulário limpeza janelas','fatura limpeza janelas','formulário empresa limpeza janelas','modelo limpador janelas','formulário serviço limpeza'],
    featuresEs:['Paquete de servicio al cliente','Seguimiento de programación de visitas','Registro de tipo de servicio','Aprobación del cliente','Historial de trabajos'],
    featuresFr:['Dossier service client','Suivi planification des visites','Registre type de service','Approbation client','Journal des travaux'],
    featuresPt:['Pacote de serviço ao cliente','Rastreamento de agendamento de visitas','Registro de tipo de serviço','Aprovação do cliente','Histórico de trabalhos'],
    buyerEs:'Empresas de limpieza de ventanas, empresas de limpieza comercial, limpiadores residenciales',
    buyerFr:'Entreprises nettoyage vitres, entreprises nettoyage commercial, nettoyeurs résidentiels',
    buyerPt:'Empresas de limpeza de janelas, empresas de limpeza comercial, limpadores residenciais',
  },
  'LS-016': {
    tradeEs:'Servicio de Piscinas', tradeFr:'Entretien de piscines', tradePt:'Serviço de Piscinas',
    keywordsEs:['formulario servicio piscina','registro quimico piscina','formulario mantenimiento piscina','tecnico piscina formulario','plantilla empresa piscina'],
    keywordsFr:['formulaire entretien piscine','registre chimique piscine','formulaire maintenance piscine','technicien piscine formulaire','modèle entreprise piscine'],
    keywordsPt:['formulário serviço piscina','registro químico piscina','formulário manutenção piscina','técnico piscina formulário','modelo empresa piscina'],
    featuresEs:['Registro semanal de química del agua','Registro de dosis de químicos','Factura de servicio','Notas de equipos','Historial de trabajos'],
    featuresFr:['Journal hebdomadaire chimie eau','Registre dosage produits chimiques','Facture de service','Notes équipements','Journal des travaux'],
    featuresPt:['Registro semanal de química da água','Registro de dosagem de produtos químicos','Fatura de serviço','Notas de equipamentos','Histórico de trabalhos'],
    buyerEs:'Empresas de servicio de piscinas, técnicos de mantenimiento de piscinas, administradores de instalaciones acuáticas',
    buyerFr:'Entreprises service piscines, techniciens maintenance piscines, gestionnaires installations aquatiques',
    buyerPt:'Empresas de serviço de piscinas, técnicos de manutenção de piscinas, gestores de instalações aquáticas',
  },
  'LS-017': {
    tradeEs:'Pisos', tradeFr:'Revêtements de sol', tradePt:'Pisos e Revestimentos',
    keywordsEs:['formulario presupuesto pisos','contratista pisos formulario','factura instalacion pisos','presupuesto alfombra azulejo','plantilla empresa pisos'],
    keywordsFr:['formulaire devis revêtements sol','entrepreneur revêtements formulaire','facture installation revêtements','devis tapis carrelage','modèle entreprise revêtements'],
    keywordsPt:['formulário orçamento pisos','empreiteiro pisos formulário','fatura instalação pisos','orçamento carpete azulejo','modelo empresa pisos'],
    featuresEs:['Matriz de alcance por habitación','Totales de pies² automáticos','Precios de material y mano de obra','Total del presupuesto','Historial de trabajos'],
    featuresFr:['Matrice portée par pièce','Totaux m² automatiques','Prix matériaux et main-d\'œuvre','Total du devis','Journal des travaux'],
    featuresPt:['Matriz de escopo por cômodo','Totais de m² automáticos','Preços de material e mão de obra','Total do orçamento','Histórico de trabalhos'],
    buyerEs:'Contratistas de pisos, instaladores de azulejos, empresas de pisos de madera, instaladores de alfombras',
    buyerFr:'Entrepreneurs revêtements sol, poseurs carrelage, entreprises parquet, installateurs moquette',
    buyerPt:'Empreiteiros de pisos, instaladores de azulejos, empresas de piso de madeira, instaladores de carpete',
  },
  'LS-018': {
    tradeEs:'Construcción y Obra', tradeFr:'Construction et chantier', tradePt:'Construção e Obras',
    keywordsEs:['reporte diario obra construccion','formulario contratista construccion','registro diario sitio','formulario supervisor obra','plantilla reporte obra'],
    keywordsFr:['rapport journalier chantier','formulaire entrepreneur construction','registre quotidien site','formulaire superviseur chantier','modèle rapport chantier'],
    keywordsPt:['relatório diário obra construção','formulário empreiteiro construção','registro diário local','formulário supervisor obra','modelo relatório obra'],
    featuresEs:['Lista de cuadrilla y horas','Registro de materiales usados','Notas de retrasos y seguridad','Resumen de fin del día','Plan del día siguiente'],
    featuresFr:['Liste équipe et heures','Registre matériaux utilisés','Notes retards et sécurité','Résumé fin de journée','Plan du lendemain'],
    featuresPt:['Lista de equipe e horas','Registro de materiais usados','Notas de atrasos e segurança','Resumo do fim do dia','Plano do próximo dia'],
    buyerEs:'Contratistas generales, supervisores de obra, subcontratistas, gerentes de proyectos',
    buyerFr:'Entrepreneurs généraux, chefs de chantier, sous-traitants, chefs de projet',
    buyerPt:'Empreiteiros gerais, supervisores de obra, subempreiteiros, gerentes de projetos',
  },
  'LS-019': {
    tradeEs:'Servicio Séptico', tradeFr:'Service de fosses septiques', tradePt:'Serviço de Fossa Séptica',
    keywordsEs:['formulario servicio septico','registro bombeo septico','formulario tecnico septico','factura servicio septico','plantilla empresa septica'],
    keywordsFr:['formulaire service fosse septique','registre pompage septique','formulaire technicien septique','facture service septique','modèle entreprise septique'],
    keywordsPt:['formulário serviço fossa séptica','registro bombeamento séptico','formulário técnico séptico','fatura serviço séptico','modelo empresa séptica'],
    featuresEs:['Registro de bombeo con número de manifiesto','Seguimiento de sitio de disposición','Detalles del tanque','Factura de servicio','Historial de trabajos'],
    featuresFr:['Journal pompage avec numéro manifeste','Suivi site d\'élimination','Détails du réservoir','Facture de service','Journal des travaux'],
    featuresPt:['Registro de bombeamento com número de manifesto','Rastreamento de local de descarte','Detalhes do tanque','Fatura de serviço','Histórico de trabalhos'],
    buyerEs:'Empresas de servicio séptico, empresas de gestión de residuos, contratistas de servicios ambientales',
    buyerFr:'Entreprises service fosse septique, sociétés gestion déchets, entrepreneurs services environnementaux',
    buyerPt:'Empresas de serviço de fossa séptica, empresas de gestão de resíduos, empreiteiros de serviços ambientais',
  },
  'LS-020': {
    tradeEs:'Cualquier Negocio de Servicios', tradeFr:'Toute entreprise de services', tradePt:'Qualquer Empresa de Serviços',
    keywordsEs:['formulario honorarios servicios','tarifa contratista formulario','formulario precios servicios','plantilla negocio servicios','formulario transparencia honorarios'],
    keywordsFr:['formulaire honoraires services','barème entrepreneur formulaire','formulaire tarification services','modèle entreprise services','formulaire transparence honoraires'],
    keywordsPt:['formulário honorários serviços','tabela empreiteiro formulário','formulário preços serviços','modelo empresa serviços','formulário transparência honorários'],
    featuresEs:['Tabla de tarifas actual','Métodos de pago aceptados','Términos de pago','Reconocimiento del cliente','Sección de cumplimiento'],
    featuresFr:['Barème tarifaire actuel','Modes de paiement acceptés','Conditions de paiement','Accusé de réception client','Section de conformité'],
    featuresPt:['Tabela de honorários atual','Métodos de pagamento aceitos','Condições de pagamento','Reconhecimento do cliente','Seção de conformidade'],
    buyerEs:'Cualquier negocio de servicios, contratistas, profesionales de oficios que agregan transparencia de tarifas a contratos',
    buyerFr:'Toute entreprise de services, entrepreneurs, professionnels du bâtiment ajoutant transparence tarifaire aux contrats',
    buyerPt:'Qualquer empresa de serviços, empreiteiros, profissionais de trades que adicionam transparência de honorários a contratos',
  },
};

// ─── Generator Functions ──────────────────────────────────────────────────────

function buildTitle(listing, langCode) {
  const t = TRADE_TRANSLATIONS[listing.id];
  const tradeName = langCode === 'en' ? listing.trade
    : langCode === 'es' ? t.tradeEs
    : langCode === 'fr' ? t.tradeFr
    : t.tradePt;

  const titles = {
    en: `${listing.name} | AI-Powered Fillable PDF | ${listing.trade} Business Form Template`,
    es: `${t ? (listing.name.replace(listing.trade, t.tradeEs)) : listing.name} | Formulario con IA | Plantilla ${tradeName}`,
    fr: `${listing.name} | Formulaire IA | Modèle ${tradeName} à remplir en ligne`,
    pt: `${listing.name} | Formulário com IA | Modelo ${tradeName} Preenchível`,
  };
  return titles[langCode].slice(0, 140);
}

function buildDescription(listing, langCode) {
  const lc = LANG[langCode];
  const t = TRADE_TRANSLATIONS[listing.id] || {};
  const enriched = {
    ...listing,
    tradeEs: t.tradeEs || listing.trade,
    tradeFr: t.tradeFr || listing.trade,
    tradePt: t.tradePt || listing.trade,
    featuresEs: t.featuresEs || listing.features,
    featuresFr: t.featuresFr || listing.features,
    featuresPt: t.featuresPt || listing.features,
    buyerEs: t.buyerEs || listing.buyer,
    buyerFr: t.buyerFr || listing.buyer,
    buyerPt: t.buyerPt || listing.buyer,
    keywordsEs: t.keywordsEs || listing.keywords,
    keywordsFr: t.keywordsFr || listing.keywords,
    keywordsPt: t.keywordsPt || listing.keywords,
  };

  const urlNote = langCode !== 'en'
    ? `\n🌐 OPENS IN ${langCode.toUpperCase()} AUTOMATICALLY: The downloaded file opens directly in ${LANG[langCode].name} — no language switching needed.\n`
    : '';

  return [
    lc.descIntro(enriched),
    urlNote,
    lc.descAI,
    lc.descSmart,
    lc.descExport,
    lc.descLanguages,
    '—'.repeat(40),
    lc.descHow,
    '—'.repeat(40),
    lc.descWhat(enriched),
    '—'.repeat(40),
    lc.descPerfectFor(enriched),
    '—'.repeat(40),
    lc.descFooter,
  ].filter(Boolean).join('\n\n');
}

function buildTags(listing, langCode) {
  const lc = LANG[langCode];
  const t = TRADE_TRANSLATIONS[listing.id] || {};
  const enriched = {
    ...listing,
    keywordsEs: t.keywordsEs || listing.keywords,
    keywordsFr: t.keywordsFr || listing.keywords,
    keywordsPt: t.keywordsPt || listing.keywords,
  };
  return lc.tags(enriched).map(tag => tag.replace(/[^a-zA-Z0-9áéíóúñüàâçèêëîïôùûæœÀÂÇÈÊËÎÏÔÙÛÆŒãõÃÕ ]/g, '').trim().slice(0,20)).filter(Boolean).slice(0,13);
}

// ─── Build all 85 listings ────────────────────────────────────────────────────

let output = '';
const separator = '\n' + '═'.repeat(80) + '\n';

// Individual listings — 4 languages × 20 templates = 80
for (const langCode of ['en','es','fr','pt']) {
  const lang = LANG[langCode];
  output += separator;
  output += `${lang.flag} ${lang.name.toUpperCase()} LISTINGS (20 templates)\n`;
  output += separator;

  for (const listing of LISTINGS) {
    const fileBase = listing.file.replace('.html', langCode !== 'en' ? `?lang=${langCode}` : '');
    output += `\n${'─'.repeat(60)}\n`;
    output += `${listing.id} — ${lang.flag} ${lang.name}\n`;
    output += `${'─'.repeat(60)}\n\n`;
    output += `TITLE:\n${buildTitle(listing, langCode)}\n\n`;
    output += `DESCRIPTION:\n${buildDescription(listing, langCode)}\n\n`;
    output += `TAGS (13):\n${buildTags(listing, langCode).join(', ')}\n\n`;
    output += `PRICE: $3.99\n`;
    output += `DIGITAL FILE: ${listing.file}${langCode !== 'en' ? ` (customer opens → auto-switches to ${lang.name})` : ''}\n`;
  }
}

// ─── Language Bundles ─────────────────────────────────────────────────────────
const bundleListings = [
  { langCode:'en', flag:'🇺🇸', price:'$9.99',
    title:'All 20 Trades Business Forms – Complete Bundle | AI-Powered Fillable PDF Templates',
    tags:['trades business forms','contractor form bundle','small business templates','digital download bundle','fillable pdf bundle','hvac plumbing forms','electrician forms','contractor templates','trades invoice bundle','business form set','ai powered forms','printable form bundle','instant download'].map(t=>t.slice(0,20)),
  },
  { langCode:'es', flag:'🇲🇽', price:'$9.99',
    title:'20 Formularios de Negocios – Paquete Completo | Con IA | Plantillas para Contratistas',
    tags:['formularios contratistas','paquete plantillas negocio','formularios oficios','descarga digital paquete','formularios hvac plomeria','plantillas electricista','formularios con ia','planilla contratista','paquete formularios','negocio servicios','plantilla imprimible','formulario digital','descarga inmediata'].map(t=>t.slice(0,20)),
  },
  { langCode:'fr', flag:'🇫🇷', price:'$9.99',
    title:'20 Formulaires Professionnels – Pack Complet | IA | Modèles pour Entrepreneurs',
    tags:['formulaires entrepreneurs','pack modèles affaires','formulaires métiers','téléchargement numérique','formulaires cvc plomberie','modèles électricien','formulaires ia','modèle entrepreneur','pack formulaires','entreprise services','modèle imprimable','formulaire numérique','téléchargement immédiat'].map(t=>t.slice(0,20)),
  },
  { langCode:'pt', flag:'🇧🇷', price:'$9.99',
    title:'20 Formulários de Negócios – Pacote Completo | Com IA | Modelos para Empreiteiros',
    tags:['formulários empreiteiros','pacote modelos negócio','formulários serviços','download digital pacote','formulários hvac encanamento','modelos eletricista','formulários com ia','modelo empreiteiro','pacote formulários','empresa serviços','modelo imprimível','formulário digital','download imediato'].map(t=>t.slice(0,20)),
  },
];

output += separator;
output += '📦 BUNDLE LISTINGS (4 language bundles)\n';
output += separator;

for (const b of bundleListings) {
  const lc = LANG[b.langCode];
  output += `\n${'─'.repeat(60)}\n`;
  output += `LS-BUNDLE — ${b.flag} ${lc.name}\n`;
  output += `${'─'.repeat(60)}\n\n`;
  output += `TITLE:\n${b.title.slice(0,140)}\n\n`;

  const bundleDesc = b.langCode === 'en' ? `Get all 20 professional trade business templates in one instant download — AI-powered, smart auto-calculating, and available in 4 languages.

✦ AI-POWERED: Every form has an "Analyze with AI" button for instant professional feedback tailored to your specific trade. 5 free analyses per month included.

⚡ SMART TEMPLATES: Auto-calculating invoices, labor costs, and material totals. Remembers your business info across all 20 forms.

📊 EXPORT & INTEGRATE: CSV download free on every form. Connect to Zapier, Google Sheets, QuickBooks, and 5,000+ apps with Pro.

🌐 4 LANGUAGES: Every form switches between English, Español, Français, and Português with one click.

WHAT'S INCLUDED (20 forms):
✓ LS-001 HVAC Service Call Notes
✓ LS-002 Plumbing Dispatch Checklist
✓ LS-003 Electrician Jobsite Inspection
✓ LS-004 Lawn Care Weekly Crew Planner
✓ LS-005 Auto Detail Intake & Waiver
✓ LS-006 Pest Control Follow-Up Cards
✓ LS-007 Roofing Change Order Approval
✓ LS-008 Pressure Washing Route Sheet
✓ LS-009 Appliance Repair Parts Tracker
✓ LS-010 Handyman Materials Reimbursement
✓ LS-011 Mobile Mechanic Service Summary
✓ LS-012 Locksmith Job Authorization
✓ LS-013 Painting Prep & Final Punch List
✓ LS-014 Snow Removal Service Checklist
✓ LS-015 Window Cleaning Client Packet
✓ LS-016 Pool Service Chemical Log
✓ LS-017 Flooring Estimate Scope Matrix
✓ LS-018 Contractor Daily Site Report
✓ LS-019 Septic Service Pump Log
✓ LS-020 Service Fee Transparency Addendum

HOW IT WORKS:
1. Download all 20 HTML files
2. Open any form in Chrome or Safari
3. Fill it out — totals calculate automatically
4. Hit "Analyze with AI" for professional insights
5. Print / Save PDF — done

TradeOpsVault · tradeopsvault.com` : `[Bundle description in ${lc.name} — mirrors English structure above]`;

  output += `DESCRIPTION:\n${bundleDesc}\n\n`;
  output += `TAGS (13):\n${b.tags.join(', ')}\n\n`;
  output += `PRICE: $9.99\n`;
  output += `DIGITAL FILES: All 20 HTML template files\n`;
}

// ─── Ultimate Bundle ──────────────────────────────────────────────────────────
output += separator;
output += '👑 ULTIMATE BUNDLE (all 20 forms × 4 languages)\n';
output += separator;

output += `\n${'─'.repeat(60)}\n`;
output += `LS-ULTIMATE\n`;
output += `${'─'.repeat(60)}\n\n`;
output += `TITLE:\nUltimate Trades Bundle – All 20 Forms in 4 Languages | AI-Powered | English Español Français Português\n\n`;
output += `DESCRIPTION:\nThe most complete trade business form pack on Etsy. All 20 professional templates, AI-powered, smart auto-calculating, in English, Español, Français, and Português.

✦ AI-POWERED ANALYSIS on every form — diagnosis suggestions, professional recommendations, job insights powered by Claude AI.

⚡ SMART AUTO-CALCULATING — invoices, labor costs, material totals, flooring square footage. All math done for you.

🌐 4 LANGUAGES — every form switches instantly between English, Español, Français, and Português. One click. Remembers your preference.

📊 EXPORT EVERYWHERE — CSV (free), Zapier webhooks to Google Sheets / QuickBooks / HubSpot (Pro), TradeOpsVault CRM (Pro).

💾 SMART MEMORY — type your company name once, remembered forever across all 20 forms and every session.

20 TRADES COVERED:
HVAC · Plumbing · Electrical · Lawn Care · Auto Detail · Pest Control · Roofing · Pressure Washing · Appliance Repair · Handyman · Mobile Mechanic · Locksmith · Painting · Snow Removal · Window Cleaning · Pool Service · Flooring · General Contractor · Septic Service · Service Fee Addendum

PERFECT FOR: Any trade business owner who wants to look professional, run organized jobs, and get paid faster.

TradeOpsVault · tradeopsvault.com · The Professional Trade Business OS\n\n`;
output += `TAGS (13):\ntrades business bundle,contractor form pack,all trades templates,ai powered forms,fillable pdf bundle,hvac plumbing electric,small business forms,digital download bundle,contractor templates,multi trade forms,auto calculating forms,4 language forms,instant download\n\n`.split(',').map(t=>t.trim().slice(0,20)).join(', ') + '\n\n';
output += `PRICE: $34.99\n`;
output += `DIGITAL FILES: All 20 HTML template files (open with ?lang=es/fr/pt for other languages)\n`;

// ─── Summary ──────────────────────────────────────────────────────────────────
output += separator;
output += `SUMMARY\n`;
output += separator;
output += `Total listings: 85\n`;
output += `  Individual EN:  20 × $3.99 = $79.80 catalog value\n`;
output += `  Individual ES:  20 × $3.99 = $79.80 catalog value\n`;
output += `  Individual FR:  20 × $3.99 = $79.80 catalog value\n`;
output += `  Individual PT:  20 × $3.99 = $79.80 catalog value\n`;
output += `  Bundles (4):     4 × $9.99 = $39.96 catalog value\n`;
output += `  Ultimate Bundle: 1 × $34.99\n`;
output += `  TOTAL CATALOG VALUE: $414.15\n\n`;
output += `Etsy listing fees: 85 × $0.20 = $17.00 one-time\n`;

// Write output
const outPath = path.join(__dirname, 'etsy-listings-all-85.txt');
fs.writeFileSync(outPath, output, 'utf8');
console.log(`✅ Generated ${outPath}`);
console.log(`📄 File size: ${(fs.statSync(outPath).size / 1024).toFixed(0)} KB`);
console.log(`📊 85 listings: 80 individual + 4 bundles + 1 ultimate`);
