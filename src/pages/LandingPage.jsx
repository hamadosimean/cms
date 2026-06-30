import React from "react";
import {
  School,
  Users,
  GraduationCap,
  CheckCircle,
  ChevronRight,
  Shield,
  Clock,
  Calendar,
  MapPin,
} from "lucide-react";
import { motion } from "motion/react";
import girlImg from "../assets/images/girl.png";
import kidImg from "../assets/images/kid.png";

export default function LandingPage({
  lang,
  onNavigateToAuth,
  classesCount,
  teachersCount,
}) {
  const isFr = lang === "fr";
  return (
    <div id="landing-page-container" className="space-y-16 py-4">
      {/* 1. HERO SECTION WITH MODERN SLATE GRADIENT */}
      <section
        id="hero-section"
        className="relative bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 text-white py-16 px-6 sm:px-12 lg:px-20 text-center sm:text-left"
      >
        {/* Subtle grid and decorative background elements */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30"></div>
        <div className="absolute -top-12 -right-12 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-12 -left-12 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wider uppercase">
            <Shield className="w-3.5 h-3.5" />
            {isFr ? "Année Académique 2026" : "Academic Year 2026"}
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            {isFr ? (
              <>
                Révolutionner l'Intégration et{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                  l'Administration Académiques
                </span>
              </>
            ) : (
              <>
                Revolutionizing Academic{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                  Onboarding & Administration
                </span>
              </>
            )}
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            {isFr
              ? "Un moteur de gestion scolaire de pointe conçu pour unifier l'inscription des étudiants, l'onboarding des enseignants et le pilotage administratif au sein d'un tableau de bord moderne et performant."
              : "A unified, state-of-the-art school management engine designed to streamline student admissions, teacher onboarding, and administrative execution inside a gorgeous modern interface."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
            <button
              id="cta-apply-student"
              onClick={() => onNavigateToAuth("student", true)}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm tracking-wide uppercase shadow-lg shadow-blue-600/20 transition flex items-center justify-center gap-2 group cursor-pointer border-0"
            >
              <span>
                {isFr ? "Postuler à l'Inscription" : "Apply for Enrollment"}
              </span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </button>

            <button
              id="cta-teacher-portal"
              onClick={() => onNavigateToAuth("teacher", false)}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-sm tracking-wide uppercase border border-slate-700 transition cursor-pointer"
            >
              {isFr ? "Accès Enseignant" : "Teacher Access"}
            </button>
          </div>
        </div>
      </section>

      {/* 1b. MASSIVE PUPILS PHOTO BANNER */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white rounded-3xl overflow-hidden border border-slate-200 p-8 shadow-sm">
        <div className="md:col-span-5 space-y-4 text-left">
          <span className="text-xs uppercase tracking-widest font-mono text-blue-600 font-bold">
            {isFr ? "NOTRE COMMUNAUTÉ ÉTUDIANTE" : "OUR STUDENT COMMUNITY"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
            {isFr
              ? "Des esprits brillants, des avenirs radieux"
              : "Bright Minds, Inspiring Futures"}
          </h2>
          <p className="text-slate-500 text-xs leading-relaxed">
            {isFr
              ? "À l'Académie Saint-Jude, nos élèves s'épanouissent dans un environnement bienveillant et stimulant. Nous formons les leaders et innovateurs de demain en combinant excellence académique et accompagnement personnalisé."
              : "St. Jude Academy is home to a diverse community of ambitious, high-achieving pupils. Our curriculum is tailored to help young minds discover their passions and achieve peak potential."}
          </p>
        </div>
        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <img
            src={kidImg}
            alt="Pupil Kid"
            className="w-full h-72 md:h-96 object-cover rounded-2xl shadow-md border border-slate-100 hover:scale-[1.01] transition duration-300"
          />
          <img
            src={girlImg}
            alt="Pupil Girl"
            className="w-full h-72 md:h-96 object-cover rounded-2xl shadow-md border border-slate-100 hover:scale-[1.01] transition duration-300"
          />
        </div>
      </section>

      {/* 2. THE TWO ACADEMIC PILLARS */}
      <section id="academic-pillars" className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            {isFr
              ? "Explorez Nos Portails Unifiés"
              : "Explore Our Unified Portals"}
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base">
            {isFr
              ? "Chaque utilisateur accède à un environnement sécurisé et optimisé pour son rôle au sein de l'Académie."
              : "Every stakeholder accesses a dedicated, highly tuned dashboard structured to maximize academic velocity."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Student Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-200 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-6">
            <div className="space-y-4 text-left">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {isFr
                    ? "Portail Candidat / Étudiant"
                    : "Student & Applicant Portal"}
                </h3>
                <p className="text-xs text-slate-400 uppercase font-mono mt-0.5 tracking-wider">
                  {isFr ? "Accès Étudiant" : "Admissions Pipeline"}
                </p>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isFr
                  ? "Postulez en ligne avec notre assistant intuitif étape par étape. Téléversez vos documents (relevé, reçu) et téléchargez instantanément votre carte d'étudiant numérique après approbation."
                  : "Submit your credentials via our beautiful multi-step wizard. Drag-and-drop transcripts, track your real-time review, and download print-ready digital student ID cards."}
              </p>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => onNavigateToAuth("student", true)}
                className="w-full py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs uppercase tracking-wider rounded-xl transition cursor-pointer"
              >
                {isFr ? "Postuler à l'Inscription" : "Apply / Register"}
              </button>
              <button
                onClick={() => onNavigateToAuth("student", false)}
                className="w-full py-2 bg-transparent text-slate-500 hover:text-slate-700 font-semibold text-xs transition cursor-pointer"
              >
                {isFr ? "Connexion Candidat" : "Applicant Login"}
              </button>
            </div>
          </div>

          {/* Teacher Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-emerald-200 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-6">
            <div className="space-y-4 text-left">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {isFr
                    ? "Portail Enseignant / Professeur"
                    : "Teacher & Faculty Hub"}
                </h3>
                <p className="text-xs text-slate-400 uppercase font-mono mt-0.5 tracking-wider">
                  {isFr ? "Affectations de cours" : "Curriculum allocations"}
                </p>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isFr
                  ? "Gérez votre profil professionnel académique, vos qualifications et vos notes de cours. Visualisez en temps réel les classes et matières qui vous ont été affectées par l'administration."
                  : "Manage your certified credentials, syllabus notes, and tracking metrics. Access clean grids outlining precisely which class sections you are allocated to teach."}
              </p>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => onNavigateToAuth("teacher", false)}
                className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs uppercase tracking-wider rounded-xl transition cursor-pointer border-0"
              >
                {isFr ? "Connexion Enseignant" : "Teacher Login"}
              </button>
              <p className="text-[10px] text-slate-400 text-center italic">
                {isFr
                  ? "Enregistré par l'administration"
                  : "Pre-registered by administrators"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE HIGHLIGHTED CAPABILITIES */}
      <section
        id="capabilities-highlight"
        className="bg-slate-100/50 border border-slate-200 rounded-3xl p-8 sm:p-12 text-left"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {isFr
                ? "Fonctionnalités Clés Haute-Performance"
                : "High-Performance Operations"}
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              {isFr
                ? "Notre suite d'outils est conçue pour simplifier les processus complexes au sein des écoles secondaires et supérieures."
                : "Our technical operations minimize frictional overhead in school management through a deeply integrated business logic."}
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-1 bg-emerald-100 text-emerald-600 rounded-lg mt-0.5">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">
                    {isFr
                      ? "Vérification Rigoureuse des Matières"
                      : "Rigorous Qualification Matcher"}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {isFr
                      ? "Le système empêche d'affecter un enseignant à une classe pour une matière s'il n'est pas qualifié pour l'enseigner dans le registre officiel."
                      : "Ensures course alignment. Teachers can only be scheduled to instruct a class if they hold matching certified courses in the school directory."}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1 bg-emerald-100 text-emerald-600 rounded-lg mt-0.5">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">
                    {isFr
                      ? "Générateur de Cartes ID d'Étudiant PDF"
                      : "Print-Ready ID Generator"}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {isFr
                      ? "Dès que l'admission d'un élève est approuvée, il peut soumettre sa photo d'identité pour générer et télécharger sa carte en format PDF."
                      : "Approved students compile visual ID credentials immediately. Integrated barcoding, status markers, and layout scaling."}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1 bg-emerald-100 text-emerald-600 rounded-lg mt-0.5">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">
                    {isFr
                      ? "Tableau de Bord KPI en Temps Réel"
                      : "Full-Throttle Admissions KPI Tracker"}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {isFr
                      ? "Les administrateurs suivent en temps réel les ratios d'admission, le statut des candidatures et les taux de remplissage des classes."
                      : "Instantly computed counts, acceptance graphs, and capacities keep academic administrators in complete control."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-2">
              <Clock className="text-blue-600 w-8 h-8" />
              <h4 className="font-bold text-slate-800 text-sm">
                {isFr ? "Zéro Délai" : "Zero Delay"}
              </h4>
              <p className="text-[11px] text-slate-500 leading-normal">
                {isFr
                  ? "Traitement instantané des justificatifs et statuts."
                  : "Instant state feedback loop across databases."}
              </p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-2">
              <Shield className="text-emerald-600 w-8 h-8" />
              <h4 className="font-bold text-slate-800 text-sm">
                {isFr ? "Sécurisé" : "Highly Secure"}
              </h4>
              <p className="text-[11px] text-slate-500 leading-normal">
                {isFr
                  ? "Contrôles de rôles stricts et isolation des formulaires."
                  : "Role-based access controls and request sandboxing."}
              </p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-2">
              <Calendar className="text-purple-600 w-8 h-8" />
              <h4 className="font-bold text-slate-800 text-sm">
                {isFr ? "Planification" : "Plannable Sections"}
              </h4>
              <p className="text-[11px] text-slate-500 leading-normal">
                {isFr
                  ? "Planification dynamique des enseignants et des cours."
                  : "Agile classroom management with drag allocation."}
              </p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-2">
              <MapPin className="text-amber-600 w-8 h-8" />
              <h4 className="font-bold text-slate-800 text-sm">
                {isFr ? "Localisation" : "Dynamic Campus"}
              </h4>
              <p className="text-[11px] text-slate-500 leading-normal">
                {isFr
                  ? "Génération de cartes scolaires imprimables instantanément."
                  : "Generate maps, certifications and rosters in a click."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SCHOOL CREED & QUOTE */}
      <section id="school-creed" className="py-6 border-y border-slate-200">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-xs uppercase tracking-widest font-mono text-blue-600 font-bold">
            {isFr ? "MOT DU CONSEIL ACADÉMIQUE" : "PRINCIPAL'S STATEMENT"}
          </span>
          <p className="text-lg sm:text-xl italic font-serif text-slate-700 leading-relaxed">
            {isFr
              ? `"Au Collège LA SALE, nous allions rigueur académique traditionnelle et outils numériques d'avant-garde pour offrir à nos étudiants et notre faculté un parcours exceptionnel, fluide et inspirant."`
              : `"At College LA SALE, we combine historic educational standards with leading-edge software systems to pave a friction-free, inspiring pathway for both our students and our esteemed faculty."`}
          </p>
          <div className="pt-2">
            <p className="font-bold text-slate-900 text-sm">
              Hamado Simean
            </p>
            <p className="text-[11px] text-slate-400 font-mono uppercase tracking-wider">
              {isFr
                ? "Directeur de l'École"
                : "School Principal"}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
