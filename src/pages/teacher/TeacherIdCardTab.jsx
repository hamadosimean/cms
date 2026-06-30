import React, { useEffect } from "react";
import { GraduationCap, CheckCircle, Download } from "lucide-react";
import { useAppStore } from "../../store/useAppStore";
import { useAppHandlers } from "../../hooks/useAppHandlers";
import { SignaturePad } from "../../components/SignaturePad";

export default function TeacherIdCardTab({ lang, getTranslation }) {
  const {
    user,
    teacherProfile,
    principalSignature,
    schoolInfo,
    setActiveSidebarTab,
  } = useAppStore();

  const { showNotification, fetchPortalData } = useAppHandlers();
  const hasPhoto = teacherProfile && teacherProfile.profile_photo_url;
  const [profileChecked, setProfileChecked] = React.useState(false);

  useEffect(() => {
    let active = true;
    const loadData = async () => {
      try {
        await fetchPortalData();
      } catch (e) {
        console.error("Failed to load portal data", e);
      }
      if (active) {
        setProfileChecked(true);
      }
    };
    loadData();
    return () => {
      active = false;
    };
  }, []);

  if (!profileChecked) {
    return (
      <div className="p-8 text-center text-slate-500 italic">
        {lang === "fr" ? "Chargement du profil..." : "Loading profile data..."}
      </div>
    );
  }

  if (!hasPhoto) {
    return (
      <div className="p-12 text-center text-slate-600 bg-white rounded-2xl shadow-sm border border-slate-200">
        <GraduationCap className="w-12 h-12 mx-auto text-slate-300 mb-4" />
        <h3 className="text-lg font-bold mb-2">
          {lang === "fr"
            ? "Photo de Profil Manquante"
            : "Profile Photo Missing"}
        </h3>
        <p className="mb-6 max-w-sm mx-auto text-sm text-slate-500">
          {lang === "fr"
            ? "Vous devez d'abord ajouter une photo dans la section Profil & Diplômes avant de pouvoir générer votre carte d'identité."
            : "You must first add a photo in the Profile & Credentials section before you can generate your ID card."}
        </p>
        <button
          onClick={() => setActiveSidebarTab("onboarding")}
          className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl uppercase tracking-wider text-xs hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20"
        >
          {lang === "fr" ? "Aller au Profil" : "Go to Profile"}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 bg-white text-slate-800 border-b border-slate-200 flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-blue-600" />
          <h3 className="font-bold text-sm uppercase tracking-wider text-slate-800">
            {lang === "fr"
              ? "Carte d'Identité de l'Enseignant"
              : "Teacher Digital ID Card"}
          </h3>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-6">
            {/* Staff Signature drawing canvas */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-500 uppercase">
                {lang === "fr"
                  ? "Dessinez votre signature professionnelle"
                  : "Draw Staff/Teacher Signature"}
              </label>
              <SignaturePad
                onSave={async (base64) => {
                  try {
                    const res = await fetch(`/api/teachers/${user.id}`, {
                      method: "PUT",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        staff_signature: base64,
                      }),
                    });
                    if (res.ok) {
                      showNotification(
                        lang === "fr"
                          ? "Signature enregistrée avec succès !"
                          : "Staff signature saved successfully!",
                        "success",
                      );
                      fetchPortalData();
                    } else {
                      showNotification("Failed to save signature", "error");
                    }
                  } catch (err) {
                    showNotification("Error saving signature", "error");
                  }
                }}
                initialSignatureUrl={teacherProfile?.staff_signature}
                lang={lang}
              />
            </div>

            {/* ID Status Tracker Info */}
            <div className="p-4 rounded-xl text-xs border bg-emerald-50 border-emerald-200 text-emerald-800">
              <div className="space-y-3">
                <p className="flex items-center gap-1.5 font-bold">
                  <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>
                    {lang === "fr"
                      ? "Votre carte d'identité est générée avec succès !"
                      : "Your Digital ID card is ready for download!"}
                  </span>
                </p>

                <a
                  href={`/api/teacher-id-cards/download/${user.id}?lang=${lang}`}
                  download={`Teacher_ID_Card_${user.last_name}.pdf`}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition shadow cursor-pointer text-center font-sans font-medium"
                >
                  <Download className="w-4 h-4" />
                  <span>{getTranslation("downloadPDF", lang)}</span>
                </a>
              </div>
            </div>

            {/* Live Preview Card Overlay */}
            {schoolInfo && (
              <div className="space-y-3">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {lang === "fr"
                    ? "Aperçu de la carte"
                    : "Digital ID Card Live Preview"}
                </label>

                {/* ID Card Box rendering to match PDF structure */}
                <div className="w-[380px] h-[240px] border-2 border-slate-200 rounded-2xl p-3 bg-white shadow-xl flex flex-col justify-between relative text-left overflow-hidden mx-auto font-sans text-slate-800 select-none">
                  {/* Subtle background element */}
                  <div className="absolute -top-12 -right-12 w-24 h-24 bg-blue-500/5 rounded-full blur-xl pointer-events-none"></div>
                  {/* Top header block */}
                  <div
                    className="h-[55px] rounded-lg flex flex-col justify-center px-4 text-white"
                    style={{
                      backgroundColor: schoolInfo.color_theme || "#2563eb",
                    }}
                  >
                    <h4 className="font-bold text-[13px] uppercase tracking-wide leading-tight text-white">
                      {schoolInfo.name || "COLLEGE LA SALE"}
                    </h4>
                    <p className="text-[7px] font-medium tracking-wider text-white opacity-90">
                      {schoolInfo.motto || "EXCELLENCE - DISCIPLINE - PROGRESS"}
                    </p>
                  </div>

                  {/* Accent border line */}
                  <div className="h-[3px] bg-amber-500 w-full" />

                  {/* Body grid */}
                  <div className="flex gap-4 items-center flex-1 py-2">
                    {/* Portrait Frame */}
                    <div className="w-[105px] h-[120px] rounded-lg border border-slate-200 overflow-hidden bg-slate-100 flex items-center justify-center shrink-0">
                      <img
                        src={teacherProfile.profile_photo_url}
                        alt="Teacher Portrait"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Metadata text */}
                    <div className="flex-1 space-y-1.5 text-slate-700 z-10">
                      <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                        FACULTY / STAFF
                      </div>

                      <div className="space-y-0.5">
                        <div className="text-[8px] uppercase font-bold text-slate-400">
                          Last Name
                        </div>
                        <div className="text-xs font-bold text-slate-900 leading-none">
                          {user.last_name?.toUpperCase() || ""}
                        </div>
                      </div>

                      <div className="space-y-0.5">
                        <div className="text-[8px] uppercase font-bold text-slate-400">
                          First Name
                        </div>
                        <div className="text-xs font-bold text-slate-900 leading-none">
                          {user.first_name || ""}
                        </div>
                      </div>

                      <div className="space-y-0.5">
                        <div className="text-[8px] uppercase font-bold text-slate-400">
                          Staff ID
                        </div>
                        <div className="text-[10px] font-mono font-bold leading-none text-slate-600">
                          {user.id?.substring(0, 8).toUpperCase() || ""}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Signatures block */}
                  <div className="flex justify-between items-end border-t border-slate-200 pt-1 text-[7px] text-slate-500 z-10">
                    {/* Teacher signature area */}
                    <div className="w-1/2 flex flex-col justify-end text-left pr-2">
                      <span className="text-[5px] text-slate-400 uppercase tracking-wider block leading-none font-bold mb-1">
                        {lang === "fr" ? "Enseignant" : "Teacher"}
                      </span>
                      <div className="bg-transparent h-6 flex items-center justify-center relative w-full border-b border-slate-300">
                        {teacherProfile?.staff_signature && (
                          <img
                            src={teacherProfile.staff_signature}
                            alt="Teacher Signature"
                            className="max-h-5 object-contain absolute"
                          />
                        )}
                        <span className="text-[4px] text-slate-400 font-mono absolute -bottom-1.5 right-1 bg-white px-0.5">
                          {lang === "fr" ? "Signé" : "Signed"}
                        </span>
                      </div>
                    </div>

                    {/* Principal Signature Area */}
                    <div className="w-1/2 flex flex-col justify-end text-right items-end pl-2">
                      <span className="text-[5px] text-slate-400 uppercase tracking-widest block leading-none font-bold mb-1">
                        {lang === "fr" ? "Directeur" : "Principal"}
                      </span>
                      <div className="bg-transparent h-6 flex items-center justify-center relative w-full border-b border-slate-300">
                        {principalSignature && (
                          <img
                            src={principalSignature}
                            alt="Principal Signature"
                            className="max-h-5 object-contain absolute"
                          />
                        )}
                        <span className="text-[4px] text-slate-400 font-mono absolute -bottom-1.5 right-1 bg-white px-0.5">
                          {lang === "fr" ? "Autorisé" : "Authorized"}
                        </span>
                      </div>
                      <span className="text-[5.5px] text-blue-600 font-bold uppercase mt-1.5">
                        {schoolInfo?.principal_name || "Principal"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
