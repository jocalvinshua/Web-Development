import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, ChevronLeft, ChevronRight, Save, User, Layout } from 'lucide-react';

import EducationForm from '../components/resume/EducationForm';
import ExperienceForm from '../components/resume/ExperienceForm';
import PersonalForm from '../components/resume/PersonalForm';
import ProjectForm from '../components/resume/ProjectForm';
import SkillsForm from '../components/resume/SkillsForm';
import SummaryForm from '../components/resume/SummaryForm';
import { dummyResumeData } from '../assets/assets';
import Preview from '../components/Preview';
import TemplateSelector from '../components/TemplateSelector';
import ColorPicker from '../components/ColorPicker';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import {toast} from 'react-toastify'

const ResumeBuilder = () => {
  const { saveResumeContent, } = useContext(AppContext)

  const { resumeId } = useParams();
  const [step, setStep] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

  const [resumeData, setResumeData] = useState({
    _id: '',
    title: 'New Resume',
    personal_info: {}, 
    professional_summary: '',
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: 'classic',
    accent_color: "#3b82f6",
  });

  const loadExistingResume = async () => {
    const resume = dummyResumeData.find(res => res._id === resumeId);
    if (resume) {
      setResumeData(resume);
      document.title = resume.title;
    }
  };

  useEffect(() => {
    loadExistingResume();
  }, [resumeId]);

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: User },
    { id: "experience", name: "Experience", icon: User },
    { id: "education", name: "Education", icon: User },
    { id: "projects", name: "Projects", icon: User },
    { id: "skills", name: "Skills", icon: User },
  ];

  const activeSection = sections[step];

  const handleSaveResume = async () => {
    if (!resumeData._id) {
      return toast.error("Resume ID not found. Please create from dashboard.");
    }
    const { _id, ...content } = resumeData;
    const result = await saveResumeContent(_id, content);
    if (result) {
      setResumeData(result);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 overflow-hidden">
      {/* Header / Nav */}
      <div className="px-6 py-4 flex justify-between items-center">
        <Link to={'/app'} className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all">
          <ArrowLeftIcon className='size-4'/> Back To Dashboard
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8">
          
          {/* Left panel -- Form */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative">

              {/* Progress Bar Container */}
              <div className='absolute top-0 left-0 right-0 h-1 bg-gray-100 z-10'>
                <div 
                  className='h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500 ease-in-out'
                  style={{ width: `${((step + 1) / sections.length) * 100}%` }} 
                />
              </div>

              {/* Section Navigation */}
              <div className='flex items-center justify-between px-6 py-4 border-b border-gray-100 mt-1'>
                <div className='flex items-center gap-2'>
                  <TemplateSelector 
                    selectedTemplate={resumeData.template} 
                    onChange={(val) => setResumeData(prev => ({ ...prev, template: val }))} 
                  />
                  <ColorPicker 
                    selectedColor={resumeData.accent_color} 
                    onChange={(color) => setResumeData(prev => ({ ...prev, accent_color: color }))} 
                  />
                </div>
                <button 
                  onClick={() => setStep(prev => Math.max(prev - 1, 0))}
                  disabled={step === 0}
                  className="flex items-center gap-1 text-sm font-medium text-gray-600 disabled:opacity-30"
                >
                  <ChevronLeft size={18} /> Previous
                </button>
                <span className="text-sm font-bold text-gray-800">{activeSection.name}</span>
                <button 
                  onClick={() => setStep(prev => Math.min(prev + 1, sections.length - 1))}
                  disabled={step === sections.length - 1}
                  className="flex items-center gap-1 text-sm font-medium text-gray-600 disabled:opacity-30"
                >
                  Next <ChevronRight size={18} />
                </button>
              </div>

              {/* Form Content */}
              <div className="p-6">
                {activeSection.id === 'personal' && (
                  <PersonalForm 
                    data={resumeData.personal_info} 
                    onChange={(data) => setResumeData(prev => ({ ...prev, personal_info: data }))} 
                    removeBackground={removeBackground} 
                    setRemoveBackground={setRemoveBackground}
                  />
                )}
                {activeSection.id === 'summary' && (
                  <SummaryForm 
                    data={resumeData.professional_summary} 
                    onChange={(val) => setResumeData(prev => ({ ...prev, professional_summary: val }))}
                  />
                )}
                {activeSection.id === 'experience' && (
                  <ExperienceForm 
                    data={resumeData.experience} 
                    onChange={(newData) => setResumeData(prev => ({ ...prev, experience: newData }))} 
                  />
                )}
                {activeSection.id === 'education' && (
                  <EducationForm 
                    data={resumeData.education} 
                    onChange={(newData) => setResumeData(prev => ({ ...prev, education: newData }))} 
                  />
                )}
                {activeSection.id === 'projects' && (
                  <ProjectForm 
                    data={resumeData.project}
                    onChange={(val) => setResumeData(prev => ({ ...prev, project: val }))} 
                  />
                )}

                {activeSection.id === 'skills' && (
                  <SkillsForm 
                    data={resumeData.skills} 
                    onChange={(val) => setResumeData(prev => ({ ...prev, skills: val }))} 
                  />
                )}
              </div>
            </div>
          </div>

          {/* Right Panel -- Preview */}
          <div className="lg:col-span-7">
            <div className="sticky top-8 flex flex-col gap-4">

              {/* Container Tombol Save */}
              <div className="flex justify-end items-center gap-3">
                <button 
                  onClick={handleSaveResume}
                  className="flex items-center gap-2 text-sm font-semibold text-green-700 bg-green-100 hover:bg-green-200 border border-green-200 active:scale-95 transition-all px-6 py-2.5 rounded-lg"
                >
                  <span>Save</span>
                  <Save size={16}/>
                </button>
              </div>

              {/* Komponen Preview */}
              <div className="shadow-2xl rounded-lg overflow-hidden border border-gray-200 bg-white">
                <Preview 
                  data={resumeData} 
                  template={resumeData.template} 
                  accentColor={resumeData.accent_color}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeBuilder