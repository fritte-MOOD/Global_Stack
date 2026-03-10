/**
 * seed.ts — Befüllt die Datenbank mit Demo-Daten.
 *
 * Ausführen:  npx tsx prisma/seed.ts
 */

import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({ url: "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.session.deleteMany();
  await prisma.process.deleteMany();
  await prisma.document.deleteMany();
  await prisma.task.deleteMany();
  await prisma.event.deleteMany();
  await prisma.message.deleteMany();
  await prisma.membership.deleteMany();
  await prisma.group.deleteMany();
  await prisma.user.deleteMany();

  // ═══════════════════════════════════════════
  // Users (Demo-User haben isDemo: true und kein Passwort)
  // ═══════════════════════════════════════════

  const alex = await prisma.user.create({
    data: {
      username: "alex",
      name: "Alex Demo",
      nickname: "alex",
      email: "alex@demo.local",
      description: "Gründer und Admin. Interessiert an dezentraler Infrastruktur und Bürgerbeteiligung.",
      isDemo: true,
    },
  });

  const maria = await prisma.user.create({
    data: {
      username: "maria",
      name: "Maria Beispiel",
      nickname: "maria",
      email: "maria@demo.local",
      description: "Aktives Mitglied in mehreren Communities. Engagiert sich besonders im Jugendbereich.",
      isDemo: true,
    },
  });

  const leon = await prisma.user.create({
    data: {
      username: "leon",
      name: "Léon Dupont",
      nickname: "leon",
      email: "leon@demo.local",
      description: "Stadtrat in Rochefort. Setzt sich für digitale Bürgerbeteiligung ein.",
      isDemo: true,
    },
  });

  // ═══════════════════════════════════════════
  // Top-Level Groups (= Server)
  // ═══════════════════════════════════════════

  const parkClub = await prisma.group.create({
    data: { slug: "park-club", name: "ParkClub", subtitle: "Sports Club", color: "#16a34a", icon: "Dumbbell" },
  });

  const marinQuarter = await prisma.group.create({
    data: { slug: "marin-quarter", name: "MarinQuarter", subtitle: "Housing Community", color: "#2563eb", icon: "Building2" },
  });

  const rochefort = await prisma.group.create({
    data: { slug: "rochefort", name: "Rochefort", subtitle: "Town", color: "#9333ea", icon: "Landmark" },
  });

  // ═══════════════════════════════════════════
  // Untergruppen
  // ═══════════════════════════════════════════

  const pcJugend = await prisma.group.create({
    data: { slug: "park-club-jugend", name: "Jugendabteilung", subtitle: "U18 Training & Turniere", color: "#16a34a", icon: "Users", parentId: parkClub.id, visibility: "public" },
  });

  const pcVorstand = await prisma.group.create({
    data: { slug: "park-club-vorstand", name: "Vorstand", subtitle: "Vereinsleitung", color: "#16a34a", icon: "Shield", parentId: parkClub.id, visibility: "private" },
  });

  const mqHausA = await prisma.group.create({
    data: { slug: "marin-quarter-haus-a", name: "Haus A", subtitle: "Erdgeschoss bis 3. OG", color: "#2563eb", icon: "Home", parentId: marinQuarter.id, visibility: "public" },
  });

  const mqGarten = await prisma.group.create({
    data: { slug: "marin-quarter-garten", name: "Gartenpflege", subtitle: "Gemeinschaftsgarten & Innenhof", color: "#2563eb", icon: "Flower2", parentId: marinQuarter.id, visibility: "public" },
  });

  const rcStadtrat = await prisma.group.create({
    data: { slug: "rochefort-stadtrat", name: "Conseil Municipal", subtitle: "Stadtrat & Verwaltung", color: "#9333ea", icon: "Gavel", parentId: rochefort.id, visibility: "public" },
  });

  const rcFeuerwehr = await prisma.group.create({
    data: { slug: "rochefort-feuerwehr", name: "Sapeurs-Pompiers", subtitle: "Freiwillige Feuerwehr", color: "#9333ea", icon: "Flame", parentId: rochefort.id, visibility: "private" },
  });

  const rcJugend = await prisma.group.create({
    data: { slug: "rochefort-jugendparlament", name: "Parlement des Jeunes", subtitle: "Jugendparlament", color: "#9333ea", icon: "GraduationCap", parentId: rochefort.id, visibility: "hidden" },
  });

  // ═══════════════════════════════════════════
  // Templates
  // ═══════════════════════════════════════════

  const tplSport = await prisma.group.create({
    data: { slug: "template-sportverein", name: "Sportverein", subtitle: "Template", color: "#16a34a", icon: "Trophy", isTemplate: true, templateDescription: "Kompletter Sportverein mit Trainingsplan, Turnieren, Jugendabteilung und Vorstand." },
  });
  await prisma.group.createMany({ data: [
    { slug: "tpl-sv-jugend", name: "Jugendabteilung", subtitle: "U18", color: "#16a34a", icon: "Users", parentId: tplSport.id, visibility: "public", isTemplate: true },
    { slug: "tpl-sv-vorstand", name: "Vorstand", subtitle: "Vereinsleitung", color: "#16a34a", icon: "Shield", parentId: tplSport.id, visibility: "private", isTemplate: true },
  ]});

  const tplWG = await prisma.group.create({
    data: { slug: "template-wohngemeinschaft", name: "Wohngemeinschaft", subtitle: "Template", color: "#2563eb", icon: "Building2", isTemplate: true, templateDescription: "Hausverwaltung mit Hausordnung, Nebenkostenabrechnung, Gartenpflege." },
  });
  await prisma.group.createMany({ data: [
    { slug: "tpl-wg-haus-a", name: "Haus A", subtitle: "Wohneinheit", color: "#2563eb", icon: "Home", parentId: tplWG.id, visibility: "public", isTemplate: true },
    { slug: "tpl-wg-garten", name: "Garten", subtitle: "Gemeinschaftsgarten", color: "#2563eb", icon: "Flower2", parentId: tplWG.id, visibility: "public", isTemplate: true },
  ]});

  const tplGemeinde = await prisma.group.create({
    data: { slug: "template-gemeinde", name: "Gemeinde", subtitle: "Template", color: "#9333ea", icon: "Landmark", isTemplate: true, templateDescription: "Kommunalverwaltung mit Stadtrat, Bürgerbeteiligung, Feuerwehr." },
  });
  await prisma.group.createMany({ data: [
    { slug: "tpl-gm-stadtrat", name: "Stadtrat", subtitle: "Verwaltung", color: "#9333ea", icon: "Gavel", parentId: tplGemeinde.id, visibility: "public", isTemplate: true },
    { slug: "tpl-gm-feuerwehr", name: "Feuerwehr", subtitle: "Einsatzgruppe", color: "#9333ea", icon: "Flame", parentId: tplGemeinde.id, visibility: "private", isTemplate: true },
  ]});

  // ═══════════════════════════════════════════
  // Memberships
  // ═══════════════════════════════════════════

  for (const g of [parkClub, marinQuarter, rochefort]) {
    await prisma.membership.create({ data: { userId: alex.id, groupId: g.id, role: "admin" } });
    await prisma.membership.create({ data: { userId: maria.id, groupId: g.id, role: "member" } });
  }
  await prisma.membership.create({ data: { userId: leon.id, groupId: rochefort.id, role: "admin" } });
  await prisma.membership.create({ data: { userId: leon.id, groupId: marinQuarter.id, role: "member" } });

  for (const sg of [pcJugend, pcVorstand, mqHausA, mqGarten, rcStadtrat, rcFeuerwehr]) {
    await prisma.membership.create({ data: { userId: alex.id, groupId: sg.id, role: "admin" } });
  }
  for (const sg of [pcJugend, mqHausA, mqGarten, rcStadtrat]) {
    await prisma.membership.create({ data: { userId: maria.id, groupId: sg.id, role: "member" } });
  }
  await prisma.membership.create({ data: { userId: leon.id, groupId: rcStadtrat.id, role: "admin" } });
  await prisma.membership.create({ data: { userId: leon.id, groupId: rcFeuerwehr.id, role: "member" } });
  await prisma.membership.create({ data: { userId: leon.id, groupId: rcJugend.id, role: "admin" } });

  // ═══════════════════════════════════════════
  // Messages
  // ═══════════════════════════════════════════

  await prisma.message.createMany({ data: [
    { content: "Willkommen im ParkClub!", authorId: alex.id, groupId: parkClub.id },
    { content: "Nächstes Training am Freitag um 18 Uhr.", authorId: alex.id, groupId: parkClub.id },
    { content: "Wer kommt zum Turnier?", authorId: maria.id, groupId: pcJugend.id },
    { content: "Hallo zusammen im MarinQuarter!", authorId: alex.id, groupId: marinQuarter.id },
    { content: "Bitte die Tür zum Garten abschließen.", authorId: maria.id, groupId: mqGarten.id },
    { content: "Bienvenue à Rochefort!", authorId: leon.id, groupId: rochefort.id },
    { content: "Nächste Ratssitzung am Montag.", authorId: leon.id, groupId: rcStadtrat.id },
  ]});

  // ═══════════════════════════════════════════
  // Events
  // ═══════════════════════════════════════════

  const nextWeek = new Date(); nextWeek.setDate(nextWeek.getDate() + 7);
  const inTwoWeeks = new Date(); inTwoWeeks.setDate(inTwoWeeks.getDate() + 14);

  await prisma.event.createMany({ data: [
    { title: "Fußball-Training", description: "Treffpunkt: Hauptplatz", startsAt: nextWeek, groupId: parkClub.id },
    { title: "Jugend-Turnier", description: "U18 Hallenturnier", startsAt: inTwoWeeks, groupId: pcJugend.id },
    { title: "Vorstandssitzung", startsAt: nextWeek, groupId: pcVorstand.id },
    { title: "Hausverwaltung Sitzung", startsAt: nextWeek, groupId: marinQuarter.id },
    { title: "Gartentag", description: "Gemeinsam Unkraut jäten", startsAt: inTwoWeeks, groupId: mqGarten.id },
    { title: "Conseil Municipal", description: "Ratssitzung im Rathaus", startsAt: nextWeek, groupId: rcStadtrat.id },
    { title: "Feuerwehrübung", description: "Brandsimulation Altstadt", startsAt: inTwoWeeks, groupId: rcFeuerwehr.id },
  ]});

  // ═══════════════════════════════════════════
  // Tasks
  // ═══════════════════════════════════════════

  await prisma.task.createMany({ data: [
    { title: "Trainingsplan erstellen", groupId: parkClub.id, creatorId: alex.id, assigneeId: alex.id },
    { title: "Trikots bestellen", groupId: pcJugend.id, creatorId: alex.id, assigneeId: maria.id },
    { title: "Jahresbericht schreiben", groupId: pcVorstand.id, creatorId: alex.id },
    { title: "Nebenkostenabrechnung prüfen", groupId: marinQuarter.id, creatorId: alex.id },
    { title: "Neue Pflanzen kaufen", groupId: mqGarten.id, creatorId: maria.id, assigneeId: maria.id },
    { title: "Budget-Entwurf vorbereiten", groupId: rochefort.id, creatorId: leon.id, assigneeId: leon.id },
    { title: "Brandschutzprotokoll aktualisieren", groupId: rcFeuerwehr.id, creatorId: leon.id },
  ]});

  // ═══════════════════════════════════════════
  // Documents
  // ═══════════════════════════════════════════

  await prisma.document.createMany({ data: [
    { title: "Vereinssatzung", content: "§1 Der Verein führt den Namen ParkClub.\n§2 Zweck des Vereins ist die Förderung des Sports.\n§3 Mitglied kann jede natürliche Person werden.", groupId: parkClub.id, authorId: alex.id },
    { title: "Jugendordnung", content: "1. Trainingszeiten: Di + Do 16–18 Uhr\n2. Turnierfahrten werden bezuschusst.\n3. Elternabend einmal pro Quartal.", groupId: pcJugend.id, authorId: alex.id },
    { title: "Hausordnung", content: "1. Ruhezeiten: 22:00 – 07:00 Uhr\n2. Haustiere nur mit Genehmigung.\n3. Gemeinschaftsräume nach Nutzung reinigen.", groupId: marinQuarter.id, authorId: alex.id },
    { title: "Gartenregeln", content: "1. Eigene Beete markieren.\n2. Gemeinsame Geräte zurückbringen.\n3. Kompost nutzen.", groupId: mqGarten.id, authorId: maria.id },
    { title: "Règlement Intérieur", content: "Art. 1 – Le conseil se réunit une fois par mois.\nArt. 2 – Les séances sont publiques.\nArt. 3 – Le maire préside les séances.", groupId: rcStadtrat.id, authorId: leon.id },
  ]});

  // ═══════════════════════════════════════════
  // Processes (Platzhalter — wird später ausgebaut)
  // ═══════════════════════════════════════════

  await prisma.process.createMany({ data: [
    { title: "Neues Spielfeld anlegen?", description: "Sollen wir ein zweites Feld bauen?", status: "active", groupId: parkClub.id, authorId: alex.id },
    { title: "Wintertraining indoor?", description: "Halle mieten für November–Februar?", status: "draft", groupId: pcJugend.id, authorId: maria.id },
    { title: "Fahrradstellplätze erweitern", status: "active", groupId: marinQuarter.id, authorId: alex.id },
    { title: "Bienenhotel aufstellen", description: "Im hinteren Gartenbereich", status: "draft", groupId: mqGarten.id, authorId: maria.id },
    { title: "Marktplatz-Renovierung", description: "Entwurf für die Neugestaltung", status: "active", groupId: rochefort.id, authorId: leon.id },
    { title: "Neue Drehleiter anschaffen?", status: "active", groupId: rcFeuerwehr.id, authorId: leon.id },
  ]});

  // Template-Content
  await prisma.event.createMany({ data: [
    { title: "Beispiel: Wöchentliches Training", startsAt: nextWeek, groupId: tplSport.id },
    { title: "Beispiel: Jahreshauptversammlung", startsAt: inTwoWeeks, groupId: tplSport.id },
  ]});
  await prisma.document.createMany({ data: [
    { title: "Beispiel: Satzung", content: "§1 Name und Sitz\n§2 Zweck\n§3 Mitgliedschaft\n§4 Organe\n§5 Beiträge", groupId: tplSport.id, authorId: alex.id },
    { title: "Beispiel: Hausordnung", content: "1. Ruhezeiten\n2. Gemeinschaftsräume\n3. Müllentsorgung", groupId: tplWG.id, authorId: alex.id },
  ]});
  await prisma.process.createMany({ data: [
    { title: "Beispiel: Beitragserhöhung", description: "Soll der Jahresbeitrag angepasst werden?", groupId: tplSport.id, authorId: alex.id },
    { title: "Beispiel: Bürgerinitiative Radwege", description: "Ausbau des Radwegenetzes", groupId: tplGemeinde.id, authorId: alex.id },
  ]});

  // ═══════════════════════════════════════════
  const topLevel = await prisma.group.count({ where: { parentId: null, isTemplate: false } });
  const subs = await prisma.group.count({ where: { NOT: { parentId: null }, isTemplate: false } });
  const templates = await prisma.group.count({ where: { isTemplate: true, parentId: null } });
  const users = await prisma.user.count();

  console.log("Seed abgeschlossen.");
  console.log(`  Server:        ${topLevel}`);
  console.log(`  Untergruppen:  ${subs}`);
  console.log(`  Templates:     ${templates}`);
  console.log(`  User:          ${users}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
