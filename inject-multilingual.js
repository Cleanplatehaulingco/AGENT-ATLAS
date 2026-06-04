/**
 * TradeOpsVault — Multilingual Engine Injector
 *
 * Injects a complete EN/ES/FR/PT language switcher into all 20 templates.
 * - Language dropdown in toolbar
 * - URL param ?lang=es/fr/pt auto-sets language on open
 * - localStorage persists preference across sessions
 * - DOM-walking engine stores original English on first run, swaps cleanly
 * - Falls back to English for any untranslated string
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const downloadsDir = path.join(__dirname, 'downloads');

// ─── Translation Dictionary ───────────────────────────────────────────────────
// Keys are English strings (exact match or substring match).
// Values: { es, fr, pt }
// Covers labels, placeholders, section headers, UI chrome, checkboxes.

const DICT = {
  // ── UI Chrome ──────────────────────────────────────────────────────────────
  'Print / Save PDF':           { es:'Imprimir / Guardar PDF',      fr:'Imprimer / Sauvegarder PDF',    pt:'Imprimir / Salvar PDF' },
  'Clear Form':                 { es:'Limpiar Formulario',           fr:'Effacer le formulaire',         pt:'Limpar Formulário' },
  'Analyze with AI':            { es:'Analizar con IA',              fr:'Analyser avec l\'IA',           pt:'Analisar com IA' },
  'Export Data':                { es:'Exportar Datos',               fr:'Exporter les données',          pt:'Exportar Dados' },
  'Smart Mode':                 { es:'Modo Inteligente',             fr:'Mode intelligent',              pt:'Modo Inteligente' },
  'HOW TO USE':                 { es:'CÓMO USAR',                    fr:'COMMENT UTILISER',              pt:'COMO USAR' },
  'Click the logo box (top-left) to upload your company logo':
    { es:'Haz clic en el logo (arriba izq.) para subir tu logo',
      fr:'Cliquez sur le logo (en haut à gauche) pour télécharger votre logo',
      pt:'Clique na caixa de logo (canto sup. esq.) para enviar seu logo' },
  'Click any field to type':
    { es:'Haz clic en cualquier campo para escribir',
      fr:'Cliquez sur n\'importe quel champ pour écrire',
      pt:'Clique em qualquer campo para digitar' },
  'Click “Print / Save PDF” when ready':
    { es:'Haz clic en “Imprimir / Guardar PDF” cuando estés listo',
      fr:'Cliquez sur “Imprimer / Sauvegarder PDF” quand vous êtes prêt',
      pt:'Clique em “Imprimir / Salvar PDF” quando estiver pronto' },
  'Best on desktop (Chrome or Safari)':
    { es:'Mejor en escritorio (Chrome o Safari)',
      fr:'Meilleur sur ordinateur (Chrome ou Safari)',
      pt:'Melhor no computador (Chrome ou Safari)' },
  'No software needed':         { es:'Sin software necesario',       fr:'Aucun logiciel nécessaire',     pt:'Sem software necessário' },
  'works fully in your browser':{ es:'funciona completamente en tu navegador', fr:'fonctionne entièrement dans votre navigateur', pt:'funciona totalmente no seu navegador' },
  'CLICK HERE':                 { es:'CLICK AQUÍ',                   fr:'CLIQUEZ ICI',                   pt:'CLIQUE AQUI' },
  'Upload Your Logo':           { es:'Sube Tu Logo',                 fr:'Téléchargez votre logo',        pt:'Envie Seu Logo' },
  'Add Your\nQR Code':          { es:'Agrega Tu\nCódigo QR',        fr:'Ajoutez votre\ncode QR',        pt:'Adicione Seu\nCódigo QR' },
  'For business use only. Retain for your records.':
    { es:'Solo para uso empresarial. Conservar para sus registros.',
      fr:'À usage professionnel uniquement. Conservez pour vos dossiers.',
      pt:'Somente para uso empresarial. Guarde para seus registros.' },
  'CONFIDENTIAL — FOR BUSINESS USE ONLY':
    { es:'CONFIDENCIAL — SOLO PARA USO EMPRESARIAL',
      fr:'CONFIDENTIEL — USAGE PROFESSIONNEL UNIQUEMENT',
      pt:'CONFIDENCIAL — SOMENTE PARA USO EMPRESARIAL' },
  'TradeOpsVault · Premium Series':
    { es:'TradeOpsVault · Serie Premium',
      fr:'TradeOpsVault · Série Premium',
      pt:'TradeOpsVault · Série Premium' },

  // ── Page Labels ────────────────────────────────────────────────────────────
  'Page 1 of 3':     { es:'Página 1 de 3',    fr:'Page 1 sur 3',    pt:'Página 1 de 3' },
  'Page 2 of 3':     { es:'Página 2 de 3',    fr:'Page 2 sur 3',    pt:'Página 2 de 3' },
  'Page 3 of 3':     { es:'Página 3 de 3',    fr:'Page 3 sur 3',    pt:'Página 3 de 3' },
  'Cover & Setup':   { es:'Portada y Configuración', fr:'Couverture et configuration', pt:'Capa e Configuração' },
  'Quick Start':     { es:'Inicio Rápido',     fr:'Démarrage rapide', pt:'Início Rápido' },

  // ── Section Headers ────────────────────────────────────────────────────────
  'Your Business Information':  { es:'Información de Tu Empresa',    fr:'Informations sur votre entreprise',    pt:'Informações da Sua Empresa' },
  'Customer & Equipment':       { es:'Cliente y Equipos',            fr:'Client et équipement',                 pt:'Cliente e Equipamentos' },
  'Complaint & Diagnosis':      { es:'Queja y Diagnóstico',          fr:'Plainte et diagnostic',                pt:'Reclamação e Diagnóstico' },
  'Refrigerant Record':         { es:'Registro de Refrigerante',     fr:'Registre de réfrigérant',              pt:'Registro de Refrigerante' },
  'Parts & Labor Invoice':      { es:'Factura de Partes y Mano de Obra', fr:'Facture de pièces et main-d\'œuvre', pt:'Fatura de Peças e Mão de Obra' },
  'Parts & Invoice':            { es:'Partes y Factura',             fr:'Pièces et facture',                    pt:'Peças e Fatura' },
  'Recommendations & Follow-Up':{ es:'Recomendaciones y Seguimiento',fr:'Recommandations et suivi',             pt:'Recomendações e Acompanhamento' },
  'Job Complete Checklist':     { es:'Lista de Verificación del Trabajo', fr:'Liste de contrôle du travail accompli', pt:'Lista de Verificação do Trabalho' },
  'Customer Satisfaction':      { es:'Satisfacción del Cliente',     fr:'Satisfaction du client',               pt:'Satisfação do Cliente' },
  'Job History Tracker':        { es:'Historial de Trabajos',        fr:'Suivi de l\'historique des travaux',   pt:'Histórico de Trabalhos' },
  'Follow-Up & Notes':          { es:'Seguimiento y Notas',          fr:'Suivi et notes',                       pt:'Acompanhamento e Notas' },
  'Monthly Summary':            { es:'Resumen Mensual',              fr:'Résumé mensuel',                       pt:'Resumo Mensal' },
  'Client & Project Information':{ es:'Información de Cliente y Proyecto', fr:'Informations client et projet',  pt:'Informações de Cliente e Projeto' },
  'Client & Property Information':{ es:'Información de Cliente y Propiedad', fr:'Informations client et propriété', pt:'Informações de Cliente e Propriedade' },
  'Client Information':         { es:'Información del Cliente',      fr:'Informations du client',               pt:'Informações do Cliente' },
  'Business & Client Information':{ es:'Información de Empresa y Cliente', fr:'Informations sur l\'entreprise et le client', pt:'Informações de Empresa e Cliente' },
  'Scope of Work & Pricing':    { es:'Alcance del Trabajo y Precios',fr:'Étendue des travaux et tarification',  pt:'Escopo do Trabalho e Preços' },
  'Scope of Change':            { es:'Alcance del Cambio',           fr:'Portée du changement',                 pt:'Escopo da Mudança' },
  'Price Adjustment':           { es:'Ajuste de Precio',             fr:'Ajustement du prix',                   pt:'Ajuste de Preço' },
  'Authorization':              { es:'Autorización',                 fr:'Autorisation',                         pt:'Autorização' },
  'Authorization Statement':    { es:'Declaración de Autorización',  fr:'Déclaration d\'autorisation',          pt:'Declaração de Autorização' },
  'Payment Terms':              { es:'Condiciones de Pago',          fr:'Conditions de paiement',               pt:'Condições de Pagamento' },
  'Cost Summary':               { es:'Resumen de Costos',            fr:'Résumé des coûts',                     pt:'Resumo de Custos' },
  'Service Invoice':            { es:'Factura de Servicio',          fr:'Facture de service',                   pt:'Fatura de Serviço' },
  'Service Record':             { es:'Registro de Servicio',         fr:'Registre de service',                  pt:'Registro de Serviço' },
  'Service Description':        { es:'Descripción del Servicio',     fr:'Description du service',               pt:'Descrição do Serviço' },
  'Service Schedule':           { es:'Horario de Servicio',          fr:'Calendrier de service',                pt:'Agendamento de Serviço' },
  'Service Selections':         { es:'Selecciones de Servicio',      fr:'Sélections de service',                pt:'Seleções de Serviço' },
  'Work Performed':             { es:'Trabajo Realizado',            fr:'Travail effectué',                     pt:'Trabalho Executado' },
  'Work Completed':             { es:'Trabajo Completado',           fr:'Travail accompli',                     pt:'Trabalho Concluído' },
  'Work Completed Today':       { es:'Trabajo Completado Hoy',       fr:'Travail accompli aujourd\'hui',        pt:'Trabalho Concluído Hoje' },
  'Hazard Assessment':          { es:'Evaluación de Riesgos',        fr:'Évaluation des risques',               pt:'Avaliação de Riscos' },
  'Panel & Circuit Inspection': { es:'Inspección de Tablero y Circuitos', fr:'Inspection du panneau et des circuits', pt:'Inspeção de Painel e Circuitos' },
  'Code Notes & Sign-Off':      { es:'Notas de Código y Firma',      fr:'Notes de code et validation',          pt:'Notas de Código e Aprovação' },
  'Diagnosis Checklist':        { es:'Lista de Diagnóstico',         fr:'Liste de diagnostic',                  pt:'Lista de Diagnóstico' },
  'Parts Order Log':            { es:'Registro de Pedido de Partes', fr:'Journal de commande de pièces',        pt:'Registro de Pedido de Peças' },
  'Parts Replaced':             { es:'Partes Reemplazadas',          fr:'Pièces remplacées',                    pt:'Peças Substituídas' },
  'Materials Purchased':        { es:'Materiales Comprados',         fr:'Matériaux achetés',                    pt:'Materiais Comprados' },
  'Materials Used / Received':  { es:'Materiales Usados / Recibidos',fr:'Matériaux utilisés / reçus',           pt:'Materiais Usados / Recebidos' },
  'Material Summary':           { es:'Resumen de Materiales',        fr:'Résumé des matériaux',                 pt:'Resumo de Materiais' },
  'Daily Route (Mon–Fri)': { es:'Ruta Diaria (Lun–Vie)',   fr:'Itinéraire quotidien (Lun–Ven)', pt:'Rota Diária (Seg–Sex)' },
  'Client Route List':          { es:'Lista de Ruta de Clientes',    fr:'Liste d\'itinéraire des clients',      pt:'Lista de Rota de Clientes' },
  'Crew Assignments':           { es:'Asignaciones de Cuadrilla',    fr:'Affectations de l\'équipe',            pt:'Atribuições de Equipe' },
  'Crew Roster':                { es:'Lista de Cuadrilla',           fr:'Liste de l\'équipe',                   pt:'Lista da Equipe' },
  'Week Overview':              { es:'Resumen de la Semana',         fr:'Aperçu de la semaine',                 pt:'Visão Geral da Semana' },
  'Daily Job List':             { es:'Lista de Trabajos del Día',    fr:'Liste des travaux quotidiens',         pt:'Lista de Trabalhos Diários' },
  'End of Day Summary':         { es:'Resumen de Fin del Día',       fr:'Résumé de fin de journée',             pt:'Resumo do Fim do Dia' },
  'Delays, Issues & Safety':    { es:'Retrasos, Problemas y Seguridad', fr:'Retards, problèmes et sécurité',   pt:'Atrasos, Problemas e Segurança' },
  'Next Day Plan':              { es:'Plan del Día Siguiente',       fr:'Plan pour le lendemain',               pt:'Plano do Próximo Dia' },
  'Surface Prep Checklist':     { es:'Lista de Preparación de Superficie', fr:'Liste de préparation de surface', pt:'Lista de Preparação de Superfície' },
  'Final Punch List':           { es:'Lista Final de Pendientes',    fr:'Liste finale des travaux restants',    pt:'Lista Final de Pendências' },
  'Primer & Top Coat Notes':    { es:'Notas de Imprimante y Capa Final', fr:'Notes d\'apprêt et couche de finition', pt:'Notas de Primer e Acabamento' },
  'Treatment Summary':          { es:'Resumen del Tratamiento',      fr:'Résumé du traitement',                 pt:'Resumo do Tratamento' },
  'Chemical Dosage Record':     { es:'Registro de Dosis Química',    fr:'Registre de dosage chimique',          pt:'Registro de Dosagem Química' },
  'Weekly Water Chemistry Log': { es:'Registro Semanal de Química del Agua', fr:'Journal hebdomadaire de chimie de l\'eau', pt:'Registro Semanal de Química da Água' },
  'Pool Information':           { es:'Información de la Piscina',    fr:'Informations sur la piscine',          pt:'Informações da Piscina' },
  'Room-by-Room Scope':         { es:'Alcance por Habitación',       fr:'Portée pièce par pièce',               pt:'Escopo por Cômodo' },
  'Estimate Total':             { es:'Total del Presupuesto',        fr:'Total de l\'estimation',               pt:'Total do Orçamento' },
  'Labor & Invoice Total':      { es:'Mano de Obra y Total de Factura', fr:'Main-d\'œuvre et total de la facture', pt:'Mão de Obra e Total da Fatura' },
  'Vehicle & Customer Info':    { es:'Info de Vehículo y Cliente',   fr:'Informations véhicule et client',      pt:'Info de Veículo e Cliente' },
  'Vehicle Information':        { es:'Información del Vehículo',     fr:'Informations sur le véhicule',         pt:'Informações do Veículo' },
  'ID Verification':            { es:'Verificación de Identidad',    fr:'Vérification d\'identité',             pt:'Verificação de Identidade' },
  'Liability Waiver':           { es:'Exención de Responsabilidad',  fr:'Décharge de responsabilité',           pt:'Isenção de Responsabilidade' },
  'Notes & Issues':             { es:'Notas y Problemas',            fr:'Notes et problèmes',                   pt:'Notas e Problemas' },
  'Observations':               { es:'Observaciones',                fr:'Observations',                         pt:'Observações' },
  'Job Information':            { es:'Información del Trabajo',      fr:'Informations sur le travail',          pt:'Informações do Trabalho' },
  'Project Information':        { es:'Información del Proyecto',     fr:'Informations sur le projet',           pt:'Informações do Projeto' },
  'Property Information':       { es:'Información de la Propiedad',  fr:'Informations sur la propriété',        pt:'Informações da Propriedade' },
  'Property Details':           { es:'Detalles de la Propiedad',     fr:'Détails de la propriété',              pt:'Detalhes da Propriedade' },
  'Site Information':           { es:'Información del Sitio',        fr:'Informations sur le site',             pt:'Informações do Local' },
  'Tank Details':               { es:'Detalles del Tanque',          fr:'Détails du réservoir',                 pt:'Detalhes do Tanque' },
  'Rig Info':                   { es:'Info del Equipo',              fr:'Informations sur l\'équipement',       pt:'Info do Equipamento' },
  'Technician Info':            { es:'Info del Técnico',             fr:'Informations du technicien',           pt:'Info do Técnico' },
  'Season Information':         { es:'Información de Temporada',     fr:'Informations sur la saison',           pt:'Informações da Temporada' },
  'Equipment Pre-Season Check': { es:'Verificación Pre-Temporada',   fr:'Vérification pré-saison',              pt:'Verificação Pré-Temporada' },
  'Service Trigger Conditions': { es:'Condiciones de Activación del Servicio', fr:'Conditions de déclenchement du service', pt:'Condições de Ativação do Serviço' },
  'Client Walkthrough Sign-Off':{ es:'Aprobación del Recorrido con el Cliente', fr:'Validation de la visite client', pt:'Aprovação do Tour com Cliente' },
  'Current Fee Schedule':       { es:'Tarifa de Honorarios Actual',  fr:'Barème tarifaire actuel',              pt:'Tabela de Honorários Atual' },
  'Compliance & Recommendations':{ es:'Cumplimiento y Recomendaciones', fr:'Conformité et recommandations',     pt:'Conformidade e Recomendações' },
  'Accepted Payment Methods':   { es:'Métodos de Pago Aceptados',    fr:'Modes de paiement acceptés',           pt:'Métodos de Pagamento Aceitos' },
  'Client Acknowledgment':      { es:'Reconocimiento del Cliente',   fr:'Accusé de réception du client',        pt:'Reconhecimento do Cliente' },
  'Client Review (optional)':   { es:'Revisión del Cliente (opcional)', fr:'Avis du client (optionnel)',        pt:'Avaliação do Cliente (opcional)' },
  'Technician Signature':       { es:'Firma del Técnico',            fr:'Signature du technicien',              pt:'Assinatura do Técnico' },
  'Customer Approval':          { es:'Aprobación del Cliente',       fr:'Approbation du client',                pt:'Aprovação do Cliente' },
  'Client Acceptance':          { es:'Aceptación del Cliente',       fr:'Acceptation du client',                pt:'Aceitação do Cliente' },
  'Client Approval':            { es:'Aprobación del Cliente',       fr:'Approbation du client',                pt:'Aprovação do Cliente' },
  'Client Signature':           { es:'Firma del Cliente',            fr:'Signature du client',                  pt:'Assinatura do Cliente' },
  'Parts Order Log':            { es:'Registro de Pedido de Piezas', fr:'Journal de commande de pièces',        pt:'Registro de Pedido de Peças' },
  'Order Summary':              { es:'Resumen del Pedido',           fr:'Résumé de la commande',                pt:'Resumo do Pedido' },
  'Next Service & Recommendations':{ es:'Próximo Servicio y Recomendaciones', fr:'Prochain service et recommandations', pt:'Próximo Serviço e Recomendações' },
  'Pending Follow-Ups':         { es:'Seguimientos Pendientes',      fr:'Suivis en attente',                    pt:'Acompanhamentos Pendentes' },

  // ── Common Field Labels ────────────────────────────────────────────────────
  'Company Name':       { es:'Nombre de la Empresa',   fr:'Nom de l\'entreprise',   pt:'Nome da Empresa' },
  'License Number':     { es:'Número de Licencia',     fr:'Numéro de licence',      pt:'Número de Licença' },
  'License #':          { es:'Licencia #',             fr:'Licence #',              pt:'Licença #' },
  'Phone':              { es:'Teléfono',                fr:'Téléphone',              pt:'Telefone' },
  'Email':              { es:'Correo Electrónico',      fr:'Courriel',               pt:'E-mail' },
  'Website':            { es:'Sitio Web',               fr:'Site web',               pt:'Site Web' },
  'Insurance Carrier':  { es:'Aseguradora',             fr:'Assureur',               pt:'Seguradora' },
  'Date':               { es:'Fecha',                   fr:'Date',                   pt:'Data' },
  'Form #':             { es:'Formulario #',            fr:'Formulaire #',           pt:'Formulário #' },
  'Job #':              { es:'Trabajo #',               fr:'Travail #',              pt:'Trabalho #' },
  'Technician':         { es:'Técnico',                 fr:'Technicien',             pt:'Técnico' },
  'Customer Name':      { es:'Nombre del Cliente',      fr:'Nom du client',          pt:'Nome do Cliente' },
  'Client Name':        { es:'Nombre del Cliente',      fr:'Nom du client',          pt:'Nome do Cliente' },
  'Client Full Name':   { es:'Nombre Completo del Cliente', fr:'Nom complet du client', pt:'Nome Completo do Cliente' },
  'Client #':           { es:'Cliente #',               fr:'Client #',               pt:'Cliente #' },
  'Service Address':    { es:'Dirección de Servicio',   fr:'Adresse de service',     pt:'Endereço de Serviço' },
  'Address':            { es:'Dirección',               fr:'Adresse',                pt:'Endereço' },
  'Billing Address':    { es:'Dirección de Facturación',fr:'Adresse de facturation', pt:'Endereço de Cobrança' },
  'Priority Level':     { es:'Nivel de Prioridad',      fr:'Niveau de priorité',     pt:'Nível de Prioridade' },
  'Equipment Type':     { es:'Tipo de Equipo',          fr:'Type d\'équipement',     pt:'Tipo de Equipamento' },
  'Make / Brand':       { es:'Marca / Fabricante',      fr:'Marque / Fabricant',     pt:'Marca / Fabricante' },
  'Model #':            { es:'Modelo #',                fr:'Modèle #',               pt:'Modelo #' },
  'Serial #':           { es:'Serie #',                 fr:'Numéro de série',        pt:'Série #' },
  'Install Year':       { es:'Año de Instalación',      fr:'Année d\'installation',  pt:'Ano de Instalação' },
  'Filter Size':        { es:'Tamaño del Filtro',       fr:'Taille du filtre',       pt:'Tamanho do Filtro' },
  'Refrigerant Type':   { es:'Tipo de Refrigerante',    fr:'Type de réfrigérant',    pt:'Tipo de Refrigerante' },
  'Warranty Status':    { es:'Estado de Garantía',      fr:'État de la garantie',    pt:'Status da Garantia' },
  'Customer-Reported Complaint':  { es:'Queja del Cliente',        fr:'Plainte du client',          pt:'Reclamação do Cliente' },
  'Technician Diagnosis':         { es:'Diagnóstico del Técnico',  fr:'Diagnostic du technicien',   pt:'Diagnóstico do Técnico' },
  'Suction Pressure (PSI)':       { es:'Presión de Succión (PSI)', fr:'Pression d\'aspiration (PSI)', pt:'Pressão de Sucção (PSI)' },
  'Discharge Pressure (PSI)':     { es:'Presión de Descarga (PSI)',fr:'Pression de refoulement (PSI)', pt:'Pressão de Descarga (PSI)' },
  'Refrigerant Added (lbs)':      { es:'Refrigerante Añadido (lbs)', fr:'Réfrigérant ajouté (lbs)', pt:'Refrigerante Adicionado (lbs)' },
  'Leak Test Result':             { es:'Resultado de Prueba de Fuga', fr:'Résultat du test de fuite', pt:'Resultado do Teste de Vazamento' },
  'Recommendations':              { es:'Recomendaciones',          fr:'Recommandations',            pt:'Recomendações' },
  'Next Service / Follow-Up':     { es:'Próximo Servicio / Seguimiento', fr:'Prochain service / suivi', pt:'Próximo Serviço / Acompanhamento' },
  'Labor Hours':        { es:'Horas de Mano de Obra',   fr:'Heures de main-d\'œuvre',pt:'Horas de Mão de Obra' },
  'Labor Rate ($/hr)':  { es:'Tarifa de Trabajo ($/hr)',fr:'Taux de main-d\'œuvre ($/h)', pt:'Taxa de Mão de Obra ($/hr)' },
  'Payment Method':     { es:'Método de Pago',          fr:'Mode de paiement',       pt:'Método de Pagamento' },
  'Rating':             { es:'Calificación',            fr:'Évaluation',             pt:'Avaliação' },
  'Customer Comments':  { es:'Comentarios del Cliente', fr:'Commentaires du client', pt:'Comentários do Cliente' },
  'Total Jobs':         { es:'Total de Trabajos',       fr:'Total des travaux',      pt:'Total de Trabalhos' },
  'Total Revenue':      { es:'Ingresos Totales',        fr:'Revenus totaux',         pt:'Receita Total' },
  'Avg Job Value':      { es:'Valor Promedio por Trabajo', fr:'Valeur moyenne par travail', pt:'Valor Médio por Trabalho' },
  'Top Client':         { es:'Cliente Principal',       fr:'Client principal',       pt:'Principal Cliente' },
  'Business Notes':     { es:'Notas del Negocio',       fr:'Notes commerciales',     pt:'Notas do Negócio' },

  // ── Invoice Table Headers ──────────────────────────────────────────────────
  'Part / Description': { es:'Parte / Descripción',    fr:'Pièce / Description',    pt:'Peça / Descrição' },
  'Item / Part Description':{ es:'Artículo / Descripción', fr:'Article / Description', pt:'Item / Descrição' },
  'Part Description':   { es:'Descripción de Pieza',   fr:'Description de pièce',   pt:'Descrição de Peça' },
  'Part #':             { es:'Pieza #',                fr:'Pièce #',                pt:'Peça #' },
  'Qty':                { es:'Cant.',                  fr:'Qté',                    pt:'Qtd.' },
  'Unit Price':         { es:'Precio Unitario',        fr:'Prix unitaire',          pt:'Preço Unitário' },
  'Unit Cost':          { es:'Costo Unitario',         fr:'Coût unitaire',          pt:'Custo Unitário' },
  'Total':              { es:'Total',                  fr:'Total',                  pt:'Total' },
  'Amount':             { es:'Monto',                  fr:'Montant',                pt:'Valor' },
  'Parts Subtotal':     { es:'Subtotal de Partes',     fr:'Sous-total des pièces',  pt:'Subtotal de Peças' },
  'Labor Total':        { es:'Total de Mano de Obra',  fr:'Total main-d\'œuvre',    pt:'Total de Mão de Obra' },
  'INVOICE TOTAL':      { es:'TOTAL DE FACTURA',       fr:'TOTAL FACTURE',          pt:'TOTAL DA FATURA' },
  'Parts Subtotal':     { es:'Subtotal de Partes',     fr:'Sous-total des pièces',  pt:'Subtotal de Peças' },

  // ── Plumbing ───────────────────────────────────────────────────────────────
  'Dispatch Priority':  { es:'Prioridad de Despacho',  fr:'Priorité de répartition',pt:'Prioridade de Despacho' },
  'Problem Type':       { es:'Tipo de Problema',       fr:'Type de problème',       pt:'Tipo de Problema' },
  'Problem Description':{ es:'Descripción del Problema', fr:'Description du problème', pt:'Descrição do Problema' },
  'Active leak':        { es:'Fuga activa',             fr:'Fuite active',           pt:'Vazamento ativo' },
  'Backflow / cross-connection': { es:'Contraflujo', fr:'Refoulement',              pt:'Refluxo' },
  'No hot water':       { es:'Sin agua caliente',       fr:'Pas d\'eau chaude',      pt:'Sem água quente' },
  'Slow drain / clog':  { es:'Drenaje lento / obstrucción', fr:'Écoulement lent / bouchon', pt:'Dreno lento / entupimento' },
  'Pipe burst / freeze':{ es:'Tubería rota / congelada',fr:'Conduite éclatée / gelée', pt:'Cano quebrado / congelado' },
  'Water heater issue': { es:'Problema con calentador', fr:'Problème de chauffe-eau',pt:'Problema com aquecedor' },
  'Toilet issue':       { es:'Problema con inodoro',    fr:'Problème de toilette',   pt:'Problema com vaso sanitário' },
  'Fixture leak':       { es:'Fuga en grifo/ducha',     fr:'Fuite de robinet',       pt:'Vazamento em torneira' },

  // ── Electrician ────────────────────────────────────────────────────────────
  'Hazard Item':        { es:'Elemento de Peligro',    fr:'Élément de danger',      pt:'Item de Perigo' },
  'Location':           { es:'Ubicación',              fr:'Emplacement',            pt:'Localização' },
  'Severity (L/M/H)':   { es:'Gravedad (B/M/A)',       fr:'Gravité (F/M/É)',        pt:'Gravidade (B/M/A)' },
  'Action Required':    { es:'Acción Requerida',       fr:'Action requise',         pt:'Ação Necessária' },
  'Resolved?':          { es:'¿Resuelto?',             fr:'Résolu ?',               pt:'Resolvido?' },
  'Code Violations / Notes': { es:'Violaciones de Código / Notas', fr:'Violations de code / Notes', pt:'Violações de Código / Notas' },

  // ── Lawn Care ─────────────────────────────────────────────────────────────
  'Crew Member':        { es:'Miembro del Equipo',     fr:'Membre de l\'équipe',    pt:'Membro da Equipe' },
  'Role':               { es:'Rol',                    fr:'Rôle',                   pt:'Função' },
  'Total Hrs':          { es:'Total Hrs',              fr:'Total heures',           pt:'Total Hrs' },

  // ── Roofing ───────────────────────────────────────────────────────────────
  'Change Order #':     { es:'Orden de Cambio #',      fr:'Ordre de modification #',pt:'Ordem de Mudança #' },
  'Change Order Date':  { es:'Fecha de Orden de Cambio', fr:'Date de l\'ordre de modification', pt:'Data da Ordem de Mudança' },
  'Scope of Change':    { es:'Alcance del Cambio',     fr:'Portée du changement',   pt:'Escopo da Mudança' },
  'Reason for Change':  { es:'Razón del Cambio',       fr:'Raison du changement',   pt:'Razão da Mudança' },
  'Original Contract Total': { es:'Total del Contrato Original', fr:'Total du contrat original', pt:'Total do Contrato Original' },
  'New Contract Total': { es:'Nuevo Total del Contrato', fr:'Nouveau total du contrat', pt:'Novo Total do Contrato' },

  // ── Flooring ──────────────────────────────────────────────────────────────
  'Room / Area':        { es:'Habitación / Área',      fr:'Pièce / Zone',           pt:'Cômodo / Área' },
  'Sq Ft':              { es:'Pies²',                  fr:'Pi²',                    pt:'M² / Pés²' },
  'Flooring Material':  { es:'Material de Piso',       fr:'Matériau de sol',        pt:'Material de Piso' },
  'Material $/sqft':    { es:'Material $/pie²',        fr:'Matériau $/pi²',         pt:'Material $/m²' },
  'Material Total':     { es:'Total de Material',      fr:'Total matériaux',        pt:'Total de Material' },
  'Labor $/sqft':       { es:'M. de Obra $/pie²',      fr:'M.-d\'œuvre $/pi²',      pt:'M. de Obra $/m²' },
  'Labor Total':        { es:'Total de M. de Obra',    fr:'Total main-d\'œuvre',    pt:'Total de Mão de Obra' },
  'Room Total':         { es:'Total por Habitación',   fr:'Total par pièce',        pt:'Total por Cômodo' },

  // ── Pool Service ──────────────────────────────────────────────────────────
  'Free Cl (FC) ppm':   { es:'Cl Libre (FC) ppm',      fr:'Cl libre (FC) ppm',      pt:'Cl Livre (FC) ppm' },
  'Total Alk (TA)':     { es:'Alc. Total (AT)',         fr:'Alc. totale (TA)',        pt:'Alc. Total (AT)' },
  'Cal Hard (CH)':      { es:'Dur. Cal. (DC)',          fr:'Dureté calc. (DC)',       pt:'Dur. Cál. (DC)' },

  // ── Pressure Washing ──────────────────────────────────────────────────────
  'Surface Type':       { es:'Tipo de Superficie',     fr:'Type de surface',        pt:'Tipo de Superfície' },
  'PSI Used':           { es:'PSI Utilizado',          fr:'PSI utilisé',            pt:'PSI Utilizado' },
  'Detergent / Mix':    { es:'Detergente / Mezcla',    fr:'Détergent / Mélange',    pt:'Detergente / Mistura' },

  // ── Auto Detail ───────────────────────────────────────────────────────────
  'Vehicle Make':       { es:'Marca del Vehículo',     fr:'Marque du véhicule',     pt:'Marca do Veículo' },
  'Vehicle Model':      { es:'Modelo del Vehículo',    fr:'Modèle du véhicule',     pt:'Modelo do Veículo' },
  'Vehicle Year':       { es:'Año del Vehículo',       fr:'Année du véhicule',      pt:'Ano do Veículo' },
  'Vehicle Color':      { es:'Color del Vehículo',     fr:'Couleur du véhicule',    pt:'Cor do Veículo' },
  'License Plate':      { es:'Placa de Matrícula',     fr:'Plaque d\'immatriculation', pt:'Placa do Veículo' },
  'Mileage':            { es:'Millaje',                fr:'Kilométrage',            pt:'Quilometragem' },
  'Clay Bar Treatment': { es:'Tratamiento de Arcilla', fr:'Traitement à l\'argile', pt:'Tratamento com Clay Bar' },
  'Ceramic Coating':    { es:'Recubrimiento Cerámico', fr:'Revêtement céramique',   pt:'Revestimento Cerâmico' },

  // ── Mobile Mechanic ───────────────────────────────────────────────────────
  'OEM / Aftermarket':  { es:'OEM / Aftermarket',      fr:'OEM / Après-vente',      pt:'OEM / Aftermarket' },
  'Part Number':        { es:'Número de Pieza',        fr:'Numéro de pièce',        pt:'Número da Peça' },
  'Brake Inspection / Service': { es:'Inspección / Servicio de Frenos', fr:'Inspection / entretien des freins', pt:'Inspeção / Serviço de Freios' },
  'Battery Test / Replacement': { es:'Prueba / Reemplazo de Batería',   fr:'Test / remplacement de batterie',   pt:'Teste / Substituição de Bateria' },

  // ── Locksmith ─────────────────────────────────────────────────────────────
  'Access Control / Smart Lock': { es:'Control de Acceso / Cerradura Inteligente', fr:'Contrôle d\'accès / Serrure intelligente', pt:'Controle de Acesso / Fechadura Inteligente' },
  'Badge / ID #':       { es:'Credencial / ID #',      fr:'Badge / ID #',           pt:'Crachá / ID #' },

  // ── Pest Control ──────────────────────────────────────────────────────────
  'Chemical Used':      { es:'Químico Utilizado',      fr:'Produit chimique utilisé',pt:'Químico Utilizado' },
  'Application Rate':   { es:'Tasa de Aplicación',     fr:'Taux d\'application',    pt:'Taxa de Aplicação' },
  'Ants':               { es:'Hormigas',               fr:'Fourmis',                pt:'Formigas' },
  'Cockroaches':        { es:'Cucarachas',              fr:'Cafards',                pt:'Baratas' },
  'Bed Bugs':           { es:'Chinches',                fr:'Punaises de lit',        pt:'Percevejos' },

  // ── Snow Removal ──────────────────────────────────────────────────────────
  'Trigger (in.)':      { es:'Activación (pulg.)',      fr:'Déclenchement (po)',     pt:'Gatilho (pol.)' },
  'Salt / Sand?':       { es:'¿Sal / Arena?',           fr:'Sel / Sable ?',          pt:'Sal / Areia?' },
  'Priority':           { es:'Prioridad',               fr:'Priorité',               pt:'Prioridade' },
  'Crew':               { es:'Cuadrilla',               fr:'Équipe',                 pt:'Equipe' },

  // ── Septic ────────────────────────────────────────────────────────────────
  'Gallons Pumped':     { es:'Galones Bombeados',       fr:'Gallons pompés',         pt:'Galões Bombeados' },
  'Waste Disposal Site':{ es:'Sitio de Disposición',    fr:'Site d\'élimination',    pt:'Local de Descarte' },
  'Manifest #':         { es:'Manifiesto #',            fr:'Manifeste #',            pt:'Manifesto #' },
  'Tank Details':       { es:'Detalles del Tanque',     fr:'Détails du réservoir',   pt:'Detalhes do Tanque' },
  'Access Risers Present?': { es:'¿Acceso con Tubos?',  fr:'Regards d\'accès ?',     pt:'Acessos Presentes?' },

  // ── Contractor Daily ──────────────────────────────────────────────────────
  'Time In':            { es:'Hora Entrada',            fr:'Heure d\'arrivée',       pt:'Hora Entrada' },
  'Time Out':           { es:'Hora Salida',             fr:'Heure de départ',        pt:'Hora Saída' },
  'Hours':              { es:'Horas',                   fr:'Heures',                 pt:'Horas' },
  'Supplier':           { es:'Proveedor',               fr:'Fournisseur',            pt:'Fornecedor' },
  'Delivered Today?':   { es:'¿Entregado Hoy?',         fr:'Livré aujourd\'hui ?',   pt:'Entregue Hoje?' },
  'Building Age (est.)':{ es:'Edad del Edificio (est.)',fr:'Âge du bâtiment (est.)', pt:'Idade do Edifício (est.)' },

  // ── Job Complete Checklist Items ───────────────────────────────────────────
  'All work performed as described': { es:'Todo el trabajo realizado según lo descrito', fr:'Tous les travaux effectués comme décrit', pt:'Todo o trabalho executado conforme descrito' },
  'Area cleaned up':    { es:'Área limpiada',           fr:'Zone nettoyée',          pt:'Área limpa' },
  'Filter checked / replaced': { es:'Filtro revisado / reemplazado', fr:'Filtre vérifié / remplacé', pt:'Filtro verificado / substituído' },
  'Customer walkthrough done': { es:'Recorrido con cliente completado', fr:'Visite client effectuée', pt:'Tour com cliente concluído' },
  'Invoice presented to customer': { es:'Factura presentada al cliente', fr:'Facture remise au client', pt:'Fatura apresentada ao cliente' },

  // ── HVAC Diagnosis Checkboxes ─────────────────────────────────────────────
  'No cooling / heating':        { es:'Sin enfriamiento / calefacción', fr:'Pas de refroidissement / chauffage', pt:'Sem resfriamento / aquecimento' },
  'Refrigerant leak':            { es:'Fuga de refrigerante',     fr:'Fuite de réfrigérant',   pt:'Vazamento de refrigerante' },
  'Dirty / clogged filter':      { es:'Filtro sucio / tapado',    fr:'Filtre sale / bouché',   pt:'Filtro sujo / entupido' },
  'Faulty thermostat':           { es:'Termostato defectuoso',    fr:'Thermostat défectueux',  pt:'Termostato com defeito' },
  'Blower motor issue':          { es:'Problema con motor soplador', fr:'Problème moteur ventilateur', pt:'Problema com motor do ventilador' },
  'Capacitor / contactor failure':{ es:'Fallo de capacitor / contactor', fr:'Défaillance condensateur/contacteur', pt:'Falha de capacitor / contator' },
  'Frozen evaporator coil':      { es:'Serpentín evaporador congelado', fr:'Serpentin évaporateur gelé', pt:'Serpentina evaporadora congelada' },
  'Condensate / drainage issue': { es:'Problema de condensado / drenaje', fr:'Problème de condensat/drainage', pt:'Problema de condensado / drenagem' },
  'Electrical fault':            { es:'Fallo eléctrico',          fr:'Défaut électrique',      pt:'Falha elétrica' },
  'Compressor failure':          { es:'Fallo del compresor',      fr:'Défaillance du compresseur', pt:'Falha do compressor' },
  'Ductwork issue':              { es:'Problema con ductos',      fr:'Problème de gaine',      pt:'Problema com dutos' },
  'Other — see notes':      { es:'Otro — ver notas',    fr:'Autre — voir notes',pt:'Outro — ver notas' },

  // ── Priority Checkboxes ────────────────────────────────────────────────────
  'Urgent':             { es:'Urgente',                 fr:'Urgent',                 pt:'Urgente' },
  'Standard':           { es:'Estándar',                fr:'Standard',               pt:'Padrão' },
  'Scheduled':          { es:'Programado',              fr:'Planifié',               pt:'Agendado' },

  // ── Signature / Sign-off ───────────────────────────────────────────────────
  'By signing you authorize work completed and accept charges above':
    { es:'Al firmar autoriza el trabajo completado y acepta los cargos anteriores',
      fr:'En signant, vous autorisez le travail effectué et acceptez les frais ci-dessus',
      pt:'Ao assinar, você autoriza o trabalho concluído e aceita os valores acima' },
  'Name / License # / Date':
    { es:'Nombre / Licencia # / Fecha',
      fr:'Nom / Licence # / Date',
      pt:'Nome / Licença # / Data' },

  // ── Common Placeholders ────────────────────────────────────────────────────
  'Full name':          { es:'Nombre completo',         fr:'Nom complet',            pt:'Nome completo' },
  'Street, City, State':{ es:'Calle, Ciudad, Estado',   fr:'Rue, Ville, Province',   pt:'Rua, Cidade, Estado' },
  'MM/DD/YYYY':         { es:'DD/MM/AAAA',              fr:'JJ/MM/AAAA',             pt:'DD/MM/AAAA' },
  'Description':        { es:'Descripción',             fr:'Description',            pt:'Descrição' },
  'Part description':   { es:'Descripción de pieza',    fr:'Description de pièce',   pt:'Descrição de peça' },
  'Name':               { es:'Nombre',                  fr:'Nom',                    pt:'Nome' },
  'Notes':              { es:'Notas',                   fr:'Notes',                  pt:'Notas' },
  'Done / Pending':     { es:'Hecho / Pendiente',       fr:'Terminé / En attente',   pt:'Feito / Pendente' },
  'Client Name':        { es:'Nombre del Cliente',      fr:'Nom du client',          pt:'Nome do Cliente' },
  'Client feedback or comments...': { es:'Comentarios del cliente...', fr:'Commentaires du client...', pt:'Comentários do cliente...' },
  'Future repairs, maintenance schedule...': { es:'Reparaciones futuras, programa de mantenimiento...', fr:'Réparations futures, calendrier d\'entretien...', pt:'Reparos futuros, agenda de manutenção...' },
  'Next visit date, scheduled maintenance...': { es:'Próxima visita, mantenimiento programado...', fr:'Date de la prochaine visite, maintenance planifiée...', pt:'Próxima visita, manutenção programada...' },
  'Pass / Fail':        { es:'Aprobado / Fallido',      fr:'Réussi / Échoué',        pt:'Aprovado / Reprovado' },
  'Active / Expired':   { es:'Activa / Vencida',        fr:'Active / Expirée',       pt:'Ativa / Expirada' },
  'Cash / Card / Invoice': { es:'Efectivo / Tarjeta / Factura', fr:'Espèces / Carte / Facture', pt:'Dinheiro / Cartão / Fatura' },
  'e.g. Split AC':      { es:'ej. Split AC',            fr:'ex. Climatiseur split',  pt:'ex. Split AC' },
  'e.g. Carrier':       { es:'ej. Carrier',             fr:'ex. Carrier',            pt:'ex. Carrier' },
  'e.g. 2.5 hrs':       { es:'ej. 2.5 hrs',            fr:'ex. 2,5 hrs',            pt:'ex. 2,5 hrs' },
  'Describe issue as reported...': { es:'Describe el problema reportado...', fr:'Décrivez le problème signalé...', pt:'Descreva o problema relatado...' },
  'Root cause found...':{ es:'Causa raíz encontrada...',fr:'Cause profonde trouvée...',pt:'Causa raiz encontrada...' },
  'Clients to follow up with...': { es:'Clientes para dar seguimiento...', fr:'Clients à relancer...', pt:'Clientes para acompanhar...' },
  'General notes, reminders, improvements...': { es:'Notas generales, recordatorios...', fr:'Notes générales, rappels, améliorations...', pt:'Notas gerais, lembretes, melhorias...' },
  'SC-0001':            { es:'SC-0001',                 fr:'SC-0001',                pt:'SC-0001' },
  'J-2024-001':         { es:'T-2024-001',              fr:'T-2024-001',             pt:'T-2024-001' },
  'YOUR COMPANY NAME':  { es:'NOMBRE DE SU EMPRESA',    fr:'NOM DE VOTRE ENTREPRISE',pt:'NOME DA SUA EMPRESA' },

  // ── What's Included section ────────────────────────────────────────────────
  "What's Included":    { es:'Qué Incluye',             fr:'Ce qui est inclus',      pt:'O Que Está Incluído' },
  'Unlimited reprints for your business': { es:'Impresiones ilimitadas para tu negocio', fr:'Impressions illimitées pour votre entreprise', pt:'Reimpressões ilimitadas para seu negócio' },
  'Fillable in browser — print as PDF': { es:'Rellenable en navegador — imprimir como PDF', fr:'Remplissable dans le navigateur — imprimer en PDF', pt:'Preenchível no navegador — imprimir como PDF' },
};

// ─── Language Switcher UI + Engine (injected verbatim) ────────────────────────
const MULTILINGUAL_ENGINE = `
<script>
(function(){
'use strict';

// ── Translation Dictionary ────────────────────────────────────────────────────
var DICT=${JSON.stringify(DICT)};

var LANG_NAMES={en:'🇺🇸 English',es:'🇲🇽 Español',fr:'🇫🇷 Français',pt:'🇧🇷 Português'};
var currentLang='en';

// ── Translation Engine ────────────────────────────────────────────────────────
// Walks the DOM storing original English text in data-en attributes,
// then swaps to target language on demand.

function translate(lang){
  if(lang==='en'){restoreEnglish();currentLang='en';return;}
  currentLang=lang;

  // Labels
  document.querySelectorAll('.field label, .info-field label, .sig-field label').forEach(function(el){
    store(el);
    var t=lookup(el.textContent.trim(),lang);
    if(t)el.textContent=t;
  });

  // Section headers (text node after the sec-num span)
  document.querySelectorAll('.section-header').forEach(function(el){
    var span=el.querySelector('.sec-num');
    // Find the text node after the span
    el.childNodes.forEach(function(node){
      if(node.nodeType===3&&node.textContent.trim()){
        if(!node._en)node._en=node.textContent;
        var t=lookup(node._en.trim(),lang);
        if(t)node.textContent=' '+t;
      }
    });
  });

  // Placeholders
  document.querySelectorAll('[data-placeholder]').forEach(function(el){
    if(!el._enPh)el._enPh=el.getAttribute('data-placeholder');
    var t=lookup(el._enPh,lang);
    if(t)el.setAttribute('data-placeholder',t);
  });

  // Toolbar buttons
  document.querySelectorAll('.toolbar-btn').forEach(function(btn){
    store(btn);
    var raw=btn._en||btn.textContent;
    // Print button
    if(raw.includes('Print'))btn.innerHTML='&#128438; '+lookup('Print / Save PDF',lang);
    if(raw.includes('Clear'))btn.textContent=lookup('Clear Form',lang);
  });

  // AI / Export buttons (tov-ai-btn)
  document.querySelectorAll('.tov-ai-btn').forEach(function(btn){
    store(btn);
    var raw=(btn._en||btn.innerHTML)||'';
    if(raw.includes('Analyz')||raw.includes('Anali')||raw.includes('AI')||raw.includes('IA')){
      var dot=btn.querySelector('.ai-dot');
      btn.innerHTML='';
      if(dot)btn.appendChild(dot);
      btn.appendChild(document.createTextNode('\\u2726 '+lookup('Analyze with AI',lang)));
    } else if(raw.includes('Export')||raw.includes('Expor')){
      btn.textContent='\\u2B07 '+lookup('Export Data',lang);
    }
  });

  // How-to bar steps
  document.querySelectorAll('.no-print span[style]').forEach(function(el){
    store(el);
    var raw=(el._en||el.textContent).trim();
    if(raw.includes('logo'))el.textContent=lookup('Click the logo box (top-left) to upload your company logo',lang)||el.textContent;
    else if(raw.includes('field')||raw.includes('campo'))el.textContent=lookup('Click any field to type',lang)||el.textContent;
    else if(raw.includes('Print')||raw.includes('Imprim'))el.textContent=lookup('Click \\u201cPrint / Save PDF\\u201d when ready',lang)||el.textContent;
  });

  // Toolbar tip
  document.querySelectorAll('.toolbar-tip').forEach(function(el){
    store(el);
    var t1=lookup('Best on desktop (Chrome or Safari)',lang);
    var t2=lookup('No software needed',lang);
    var t3=lookup('works fully in your browser',lang);
    if(t1&&t2&&t3)el.innerHTML='\\u24D8 '+t1+' &nbsp;&bull;&nbsp; '+t2+' \\u2014 '+t3;
  });

  // Smart Mode badge
  document.querySelectorAll('.tov-smart-badge').forEach(function(el){
    var t=lookup('Smart Mode',lang);
    if(t)el.querySelector('span:last-child')&&(el.querySelector('span:last-child').textContent=t);
  });

  // Table headers
  document.querySelectorAll('.form-table thead th').forEach(function(th){
    store(th);
    var t=lookup((th._en||th.textContent).trim(),lang);
    if(t)th.textContent=t;
  });

  // Page labels
  document.querySelectorAll('.page-label').forEach(function(el){
    store(el);
    var raw=(el._en||el.textContent).trim();
    // Try full string first, then key parts
    var t=lookup(raw,lang);
    if(!t){
      ['Page 1 of 3','Page 2 of 3','Page 3 of 3'].forEach(function(pg){
        if(raw.startsWith(pg)){
          var rest=raw.slice(pg.length);
          var tpg=lookup(pg,lang);
          if(tpg)t=tpg+rest;
        }
      });
    }
    if(t)el.textContent=t;
  });

  // Cover box titles
  document.querySelectorAll('.cover-box-title').forEach(function(el){
    store(el);
    var t=lookup((el._en||el.textContent).replace(/[✓⚡]/g,'').trim(),lang);
    if(t){var prefix=el.textContent.match(/^[✓⚡]\s*/);el.textContent=(prefix?prefix[0]:'')+t;}
  });

  // Check-item labels (checkboxes)
  document.querySelectorAll('.check-item label, .check-item span').forEach(function(el){
    if(el.querySelector('input'))return;
    var txt=(el.textContent||'').trim();
    if(!txt)return;
    store(el);
    var raw=(el._en||txt).trim();
    var t=lookup(raw,lang);
    if(t)el.textContent=t;
  });

  // Signature sub-labels
  document.querySelectorAll('.sig-sub').forEach(function(el){
    store(el);
    var t=lookup((el._en||el.textContent).trim(),lang);
    if(t)el.textContent=t;
  });

  // Footer text
  document.querySelectorAll('.footer-legal').forEach(function(el){
    store(el);
    var t=lookup('For business use only. Retain for your records.',lang);
    if(t)el.textContent=t;
  });
  document.querySelectorAll('.footer-conf').forEach(function(el){
    store(el);
    var t=lookup('CONFIDENTIAL \\u2014 FOR BUSINESS USE ONLY',lang);
    if(t)el.textContent=t;
  });

  localStorage.setItem('tov_lang',lang);
}

function restoreEnglish(){
  document.querySelectorAll('[data-en]').forEach(function(el){
    el.textContent=el.getAttribute('data-en');
  });
  document.querySelectorAll('[data-en-ph]').forEach(function(el){
    el.setAttribute('data-placeholder',el.getAttribute('data-en-ph'));
  });
  document.querySelectorAll('.section-header').forEach(function(el){
    el.childNodes.forEach(function(node){
      if(node.nodeType===3&&node._en)node.textContent=' '+node._en.trim();
    });
  });
  localStorage.setItem('tov_lang','en');
}

function store(el){
  if(!el.getAttribute('data-en'))el.setAttribute('data-en',el.textContent.trim());
}

function lookup(str,lang){
  if(!str)return null;
  var s=str.trim();
  // Exact match
  if(DICT[s]&&DICT[s][lang])return DICT[s][lang];
  // HTML entity decode attempt
  var decoded=s.replace(/&amp;/g,'&').replace(/&ndash;/g,'\\u2013').replace(/&mdash;/g,'\\u2014').replace(/&ldquo;/g,'\\u201c').replace(/&rdquo;/g,'\\u201d');
  if(DICT[decoded]&&DICT[decoded][lang])return DICT[decoded][lang];
  // Partial match — key is substring of string
  var keys=Object.keys(DICT);
  for(var i=0;i<keys.length;i++){
    if(s.includes(keys[i])&&DICT[keys[i]][lang]){
      return s.replace(keys[i],DICT[keys[i]][lang]);
    }
  }
  return null;
}

// ── Language Switcher UI ──────────────────────────────────────────────────────
function buildSwitcher(){
  var toolbar=document.querySelector('.toolbar');
  if(!toolbar)return;

  var wrap=document.createElement('div');
  wrap.style.cssText='display:inline-flex;align-items:center;gap:0;margin-left:4px;position:relative;';

  var btn=document.createElement('button');
  btn.className='toolbar-btn btn-clear';
  btn.id='tov-lang-btn';
  btn.style.cssText='padding:8px 14px;display:inline-flex;align-items:center;gap:6px;font-size:9pt;font-weight:700;';
  btn.innerHTML='\\uD83C\\uDF10 English \\u25BE';

  var dropdown=document.createElement('div');
  dropdown.id='tov-lang-menu';
  dropdown.style.cssText='display:none;position:absolute;top:calc(100% + 4px);left:0;background:#0d1526;'
    +'border:1.5px solid rgba(255,255,255,0.15);border-radius:10px;box-shadow:0 12px 40px rgba(0,0,0,0.5);'
    +'z-index:10000;min-width:160px;overflow:hidden;font-family:inherit;';

  var langs=[
    {code:'en',label:'\\uD83C\\uDDFA\\uD83C\\uDDF8 English'},
    {code:'es',label:'\\uD83C\\uDDF2\\uD83C\\uDDFD Español'},
    {code:'fr',label:'\\uD83C\\uDDEB\\uD83C\\uDDF7 Français'},
    {code:'pt',label:'\\uD83C\\uDDE7\\uD83C\\uDDF7 Português'}
  ];

  langs.forEach(function(l){
    var item=document.createElement('div');
    item.setAttribute('data-lang',l.code);
    item.style.cssText='padding:10px 16px;color:#fff;font-size:9pt;font-weight:700;cursor:pointer;'
      +'transition:background .1s;border-bottom:1px solid rgba(255,255,255,0.07);';
    item.textContent=l.label;
    item.addEventListener('mouseenter',function(){item.style.background='rgba(232,93,4,0.15)';});
    item.addEventListener('mouseleave',function(){item.style.background='';});
    item.addEventListener('click',function(){
      setLanguage(l.code);
      dropdown.style.display='none';
    });
    dropdown.appendChild(item);
  });

  btn.addEventListener('click',function(e){
    e.stopPropagation();
    dropdown.style.display=dropdown.style.display==='none'?'block':'none';
  });
  document.addEventListener('click',function(){dropdown.style.display='none';});

  wrap.appendChild(btn);
  wrap.appendChild(dropdown);
  toolbar.insertBefore(wrap,toolbar.querySelector('.toolbar-tip'));
}

function setLanguage(lang){
  var btn=document.getElementById('tov-lang-btn');
  var labels={en:'\\uD83C\\uDDFA\\uD83C\\uDDF8 English',es:'\\uD83C\\uDDF2\\uD83C\\uDDFD Español',fr:'\\uD83C\\uDDEB\\uD83C\\uDDF7 Français',pt:'\\uD83C\\uDDE7\\uD83C\\uDDF7 Português'};
  if(btn)btn.innerHTML=labels[lang]+' \\u25BE';
  translate(lang);
  // Mark active item
  document.querySelectorAll('#tov-lang-menu [data-lang]').forEach(function(item){
    item.style.color=item.getAttribute('data-lang')===lang?'#e85d04':'#fff';
    item.style.fontWeight=item.getAttribute('data-lang')===lang?'900':'700';
  });
}

// ── Init ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded',function(){
  buildSwitcher();

  // 1. URL param ?lang=es overrides everything
  var urlLang=new URLSearchParams(window.location.search).get('lang');
  // 2. localStorage preference
  var savedLang=localStorage.getItem('tov_lang');
  // 3. Browser locale fallback
  var browserLang=(navigator.language||'en').slice(0,2).toLowerCase();
  var supported=['en','es','fr','pt'];

  var lang=
    (urlLang&&supported.includes(urlLang))?urlLang:
    (savedLang&&supported.includes(savedLang))?savedLang:
    (supported.includes(browserLang))?browserLang:'en';

  if(lang&&lang!=='en')setLanguage(lang);
  else setLanguage('en');
});

})();
</script>`;

// ─── Inject into all templates ────────────────────────────────────────────────
const files = fs.readdirSync(downloadsDir)
  .filter(f => f.match(/^LS-\d+.*\.html$/))
  .sort();

let updated = 0, skipped = 0;

for (const file of files) {
  const filePath = path.join(downloadsDir, file);
  let html = fs.readFileSync(filePath, 'utf8');

  if (html.includes('tov-lang-btn') || html.includes('tov_lang')) {
    console.log(`⏭ Already multilingual: ${file.slice(0, 40)}`);
    skipped++;
    continue;
  }

  // Inject right before </body></html>
  html = html.replace('</body></html>', MULTILINGUAL_ENGINE + '\n</body></html>');

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`✅ ${file.slice(0, 55)}`);
  updated++;
}

console.log(`\n📊 Done — ${updated} multilingual, ${skipped} skipped`);
