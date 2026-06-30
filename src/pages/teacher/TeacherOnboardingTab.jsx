import React, { useRef } from "react";
import { Users, Upload } from "lucide-react";
import { useAppStore } from "../../store/useAppStore";
import { useAppHandlers } from "../../hooks/useAppHandlers";

export default function TeacherOnboardingTab({
  lang,
  getTranslation,
  handleTeacherOnboardingSubmit,
  teacherQualifications,
  setTeacherQualifications,
  teacherExperience,
  setTeacherExperience,
  teacherCurriculumNotes,
  setTeacherCurriculumNotes,
}) {
  const { user, teacherProfile, setCroppingImage, setOnCropComplete } =
    useAppStore();
  const { showNotification, fetchPortalData } = useAppHandlers();
  const fileInputRef = useRef(null);

  const handlePhotoSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCroppingImage(reader.result);
        setOnCropComplete(() => async (cropped) => {
          try {
            const res = await fetch(`/api/teachers/${user.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                profile_photo_url: cropped,
              }),
            });
            if (res.ok) {
              showNotification(
                lang === "fr"
                  ? "Photo de profil enregistrée avec succès !"
                  : "Profile photo saved and activated successfully!",
                "success",
              );
              fetchPortalData();
            } else {
              showNotification("Failed to save photo", "error");
            }
          } catch (err) {
            showNotification("Error saving profile photo", "error");
          }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const hasPhoto = teacherProfile && teacherProfile.profile_photo_url;

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 bg-white text-slate-800 border-b border-slate-200 flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-600" />
          <h3 className="font-bold text-sm uppercase tracking-wider text-slate-800">
            {getTranslation("onboardingStepTitle", lang)}
          </h3>
        </div>

        <form
          onSubmit={handleTeacherOnboardingSubmit}
          className="p-6 sm:p-8 space-y-6 text-left"
        >
          {/* Photo Upload */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-500 uppercase">
              {lang === "fr"
                ? "Photo d'identité (Requis pour la carte)"
                : "ID Portrait Photo (Required for Card)"}
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="p-4 rounded-xl border-2 border-dashed border-slate-200 hover:border-blue-500 hover:bg-slate-50 text-center cursor-pointer transition relative"
            >
              {hasPhoto ? (
                <div className="space-y-2">
                  <img
                    src={teacherProfile.profile_photo_url}
                    alt="Profile preview"
                    className="w-20 h-20 rounded-lg object-cover mx-auto shadow border border-slate-300"
                  />
                  <span className="text-[10px] font-mono text-emerald-600 block font-bold">
                    ✓{" "}
                    {lang === "fr"
                      ? "photo_identite.png chargée"
                      : "portrait_photo.png active"}
                  </span>
                </div>
              ) : (
                <div className="py-2">
                  <Upload className="w-7 h-7 text-slate-400 mx-auto mb-1.5" />
                  <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">
                    {lang === "fr"
                      ? "Cliquer pour téléverser votre portrait"
                      : "Click to select portrait photo"}
                  </span>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handlePhotoSelect}
                className="hidden"
              />
            </div>
          </div>

          {/* Qualifications */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
              {getTranslation("teacherQualifications", lang)}
            </label>
            <input
              type="text"
              required
              value={teacherQualifications}
              onChange={(e) => setTeacherQualifications(e.target.value)}
              placeholder="e.g. Master of Arts in Literature & Philosophy"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition"
            />
          </div>

          {/* Years Exp */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
              {getTranslation("experienceYears", lang)}
            </label>
            <input
              type="number"
              required
              min={0}
              max={50}
              value={teacherExperience}
              onChange={(e) => setTeacherExperience(Number(e.target.value))}
              className="w-full max-w-xs px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition font-mono"
            />
          </div>

          {/* Curriculum Tracking notes */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
              {getTranslation("curriculumNotes", lang)}
            </label>
            <textarea
              required
              value={teacherCurriculumNotes}
              onChange={(e) => setTeacherCurriculumNotes(e.target.value)}
              placeholder="Indicate syllabus parameters, syllabus tracking, courses details..."
              className="w-full p-3 rounded-lg border border-slate-200 text-sm min-h-32 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition"
            />
          </div>

          <div className="pt-6 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider transition shadow-md cursor-pointer"
            >
              {getTranslation("saveTeacher", lang)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
