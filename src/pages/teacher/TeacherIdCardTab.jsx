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

  // Auto-redirect to Profile & Credentials if they do not have a portrait photo yet
  useEffect(() => {
    if (profileChecked && !hasPhoto) {
      showNotification(
        lang === "fr"
          ? "Veuillez téléverser une photo d'identité dans votre profil d'abord."
          : "Please upload an ID portrait photo in your Profile & Credentials tab first.",
        "info"
      );
      setActiveSidebarTab("onboarding");
    }
  }, [profileChecked, hasPhoto, lang, setActiveSidebarTab]);

  if (!profileChecked) {
    return (
      <div className="p-8 text-center text-slate-500 italic">
        {lang === "fr" ? "Chargement du profil..." : "Loading profile data..."}
      </div>
    );
  }

  if (!hasPhoto) {
    return null; // Return null while redirect takes effect
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 bg-white text-slate-800 border-b border-slate-200 flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-blue-600" />
          <h3 className="font-bold text-sm uppercase tracking-wider text-slate-800">
            {lang === "fr" ? "Carte d'Identité de l'Enseignant" : "Teacher Digital ID Card"}
          </h3>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-6">
            
            {/* Staff Signature drawing canvas */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-500 uppercase">
                {lang === "fr" ? "Dessinez votre signature professionnelle" : "Draw Staff/Teacher Signature"}
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
                        "success"
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
                  href={`/api/teacher-id-cards/download/${user.id}`}
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
                  {lang === "fr" ? "Aperçu de la carte" : "Digital ID Card Live Preview"}
                </label>

                {/* ID Card Box rendering to match PDF structure */}
                <div className="w-[380px] h-[240px] border-2 border-slate-300 rounded-2xl p-3 bg-slate-50/50 shadow-md flex flex-col justify-between relative text-left overflow-hidden mx-auto font-sans">
                  
                  {/* Top header block */}
                  <div
                    className="h-[55px] rounded-lg flex flex-col justify-center px-4 text-white"
                    style={{ backgroundColor: schoolInfo.color_theme || "#2563eb" }}
                  >
                    <h4 className="font-bold text-[13px] uppercase tracking-wide leading-tight">
                      {schoolInfo.name || "COLLEGE LA SALE"}
                    </h4>
                    <p className="text-[7px] font-medium tracking-wider opacity-90">
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
                    <div className="flex-1 space-y-1.5 text-slate-700">
                      <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                        FACULTY / STAFF
                      </div>
                      
                      <div className="space-y-0.5">
                        <div className="text-[8px] uppercase font-bold text-slate-400">Last Name</div>
                        <div className="text-xs font-bold text-slate-900 leading-none">{user.last_name.toUpperCase()}</div>
                      </div>

                      <div className="space-y-0.5">
                        <div className="text-[8px] uppercase font-bold text-slate-400">First Name</div>
                        <div className="text-xs font-bold text-slate-900 leading-none">{user.first_name}</div>
                      </div>

                      <div className="space-y-0.5">
                        <div className="text-[8px] uppercase font-bold text-slate-400">Staff ID</div>
                        <div className="text-[10px] font-mono font-bold leading-none text-slate-600">{user.id.substring(0, 8).toUpperCase()}</div>
                      </div>
                    </div>
                  </div>

                  {/* Signatures block */}
                  {/* Signatures block */}
                  <div className="flex justify-between items-end border-t border-slate-100 pt-1 text-[7px] text-slate-400">
                    {/* Teacher signature area */}
                    <div className="w-1/2 flex flex-col justify-end text-left">
                      <span className="text-[5px] text-slate-400 uppercase tracking-wider block leading-none font-bold mb-1">
                        {lang === "fr" ? "Enseignant" : "Teacher"}
                      </span>
                      <div className="border-b border-slate-200 h-4 flex items-center justify-center relative w-full">
                        {teacherProfile?.staff_signature && (
                          <img
                            src={teacherProfile.staff_signature}
                            alt="Teacher Signature"
                            className="max-h-4 object-contain absolute -top-1"
                          />
                        )}
                        <span className="text-[4.5px] text-slate-500 font-mono absolute -bottom-[3px] bg-slate-50 px-1">
                          {lang === "fr" ? "Signature Enseignant" : "Teacher Signature"}
                        </span>
                      </div>
                    </div>

                    {/* Principal Signature Area */}
                    <div className="w-1/2 flex flex-col justify-end text-right items-end border-l border-slate-100 pl-2">
                      <span className="text-[5px] text-slate-400 uppercase tracking-widest block leading-none font-bold mb-1">
                        {lang === "fr" ? "Directeur" : "Principal"}
                      </span>
                      <div className="h-4 flex items-center justify-center relative w-full border-b border-slate-200">
                        {principalSignature && (
                          <img
                            src={principalSignature}
                            alt="Principal Signature"
                            className="max-h-4 object-contain absolute -top-1"
                          />
                        )}
                        <span className="text-[4.5px] text-slate-500 font-mono absolute -bottom-[3px] bg-slate-50 px-1">
                          {lang === "fr" ? "Signature du Directeur" : "Principal Signature"}
                        </span>
                      </div>
                      <span className="text-[5.5px] text-blue-600 font-bold uppercase mt-1">
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
