import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  ArrowLeftIcon, ChevronLeft, ChevronRight, Save,
  User, FileText, Briefcase, GraduationCap, FolderGit2, Star
} from 'lucide-react';
import { toast } from 'react-hot-toast';

import api from '../config/api';

import EducationForm from '../components/resume/EducationForm';
import ExperienceForm from '../components/resume/ExperienceForm';
import PersonalForm from '../components/resume/PersonalForm';
import ProjectForm from '../components/resume/ProjectForm';
import SkillsForm from '../components/resume/SkillsForm';
import SummaryForm from '../components/resume/SummaryForm';
import Preview from '../components/Preview';
import TemplateSelector from '../components/TemplateSelector';
import ColorPicker from '../components/ColorPicker';

const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const { token } = useSelector(state => state.auth);

  const [actionIndex, setActionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const [resumeData, setResumeData] = useState({
    _id: '',
    title: 'New Resume',
    personalInfo: {
      fullName: '',
      email: '',
      phoneNumber: '',
      location: '',
      profession: '',
      linkedin: '',
      website: '',
      image: null,
    },
    professionalSummary: '',
    experiences: [],
    education: [],
    projects: [],
    skills: [],
    template: 'classic',
    accentColor: '#3b82f6',
  });


  const loadExistingResume = async () => {
  try {
    const { data } = await api.get(
      '/api/resume/get/' + resumeId,
      { headers: { Authorization: token } }
    );

    if (data.data) {
      setResumeData(data.data);
      document.title = data.data.title || 'Resume Builder';
    }
  } catch (error) {
    toast.error('Failed to load resume');
    console.error(error);
  }
};

  useEffect(() => {
    loadExistingResume();
  }, [resumeId, token]);

  // Saving resume into database
  const handleSaveResume = async () => {
    try {
      let updatedResumeData = structuredClone(resumeData);
      delete updatedResumeData._id;
      // Remove image if it's a File
      if (typeof resumeData.personalInfo.image === 'object') {

        delete updatedResumeData.personalInfo.image;
      }
      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append('resumeData',JSON.stringify(updatedResumeData));
      removeBackground && formData.append("removeBackground", "yes")
      typeof resumeData.personalInfo.image === 'object' && formData.append("image", resumeData.personalInfo.image)
      
      const { data } = await api.put(`/api/resume/update`, formData, {
                        headers: { Authorization: token }
                      });


      if (data?.success) {
        setResumeData(data.data);
        console.log(data)
        toast.success('Resume saved');
      }
    } catch (error) {
      toast.error('Failed to save resume');
      console.error(error);
    }
  };

  const sections = [
    { id: 'personal', name: 'Personal Info', icon: User },
    { id: 'summary', name: 'Summary', icon: FileText },
    { id: 'experience', name: 'Experience', icon: Briefcase },
    { id: 'education', name: 'Education', icon: GraduationCap },
    { id: 'projects', name: 'Projects', icon: FolderGit2 },
    { id: 'skills', name: 'Skills', icon: Star },
  ];

  const activeSection = sections[actionIndex];
  const Icon = activeSection.icon;

  return (
    <div className="flex flex-col h-screen bg-gray-100 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 flex justify-between items-center bg-white border-b">
        <Link to="/app" className="flex items-center gap-2 text-slate-500 hover:text-slate-700">
          <ArrowLeftIcon className='size-4' /> Back To Dashboard
        </Link>
      </div>

        <div className="max-w-7xl mx-auto px-4 pb-8">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Left Side - Form */}
            <div className="lg:col-span-5 rounded-lg overflow-hidden relative">
              <div className="bg-white rounded-lg shodw-sm border border-gray-200 p-6 pt-1">
                {/* Progress Barr */}
                <hr className="absolute top-0 left-0 right-0 border-2 border-gray-200" />
                <hr
                  className="absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-2000" 
                  style={{ width: `${((actionIndex + 1) / sections.length) * 100}%` }}
                />

                {/* Section Navigation */}
                <div className="flex justify-between items-cennter mb-6 border-b border-gray-300 py-1">
                  <div className='flex justify-between items-center px-6 py-4 border-b'>
                    <TemplateSelector
                      selectedTemplate={resumeData.template}
                      onChange={(val) => setResumeData(p => ({ ...p, template: val }))}
                    />
                    <ColorPicker
                      selectedColor={resumeData.accentColor}
                      onChange={(c) => setResumeData(p => ({ ...p, accentColor: c }))}
                    />
                  </div>
                  <div className="flex items-center">
                    {actionIndex !== 0 &&(
                      <button 
                        onClick={() => setActionIndex((prev) => Math.max(prev - 1, 0))}
                        className="flex items-center gap-1 p-3 rounded-lg text-sm font-medium texxt-gray-600 hover:bg-gray-50 transition-all" disabled={actionIndex === 0}>
                          <ChevronLeft className='size-4'/> Previous
                        </button>
                    )}
                    <button 
                        onClick={() => setActionIndex((prev) => Math.min(prev + 1, sections.length - 1))}
                        className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium texxt-gray-600 hover:bg-gray-50 transition-all ${activeSection === sections.length - 1 && 'opacity-50'}`} disabled={actionIndex === sections.length - 1}>
                          <ChevronRight className='size-4'/> Next
                        </button>
                  </div>
                </div>
                
                {/* Form Content */}
                <div className="space-y-6">
                  {activeSection.id === 'personal' &&(
                    <PersonalForm
                    data={resumeData.personalInfo}
                    onChange={(data) => {setResumeData(prev => ({...prev, personalInfo: data}))}}
                    removeBackground={removeBackground}
                    setRemoveBackground={setRemoveBackground}
                  />
                  )}
                  {activeSection.id === 'summary' && (
                  <SummaryForm
                    data={resumeData.professionalSummary}
                    onChange={(data) => setResumeData(prev => ({ ...prev, professionalSummary: data }))}
                  />
                  )}
                  {activeSection.id === 'experience' && (
                    <ExperienceForm
                      data={resumeData.experiences}
                      onChange={(data) => setResumeData(prev => ({ ...prev, experiences: data }))}
                    />
                  )}
                  {activeSection.id === 'education' && (
                    <EducationForm
                      data={resumeData.education}
                      onChange={(data) => setResumeData(prev => ({ ...prev, education: data }))}
                    />
                  )}
                  {activeSection.id === 'projects' && (
                    <ProjectForm
                      data={resumeData.projects}
                      onChange={(data) => setResumeData(prev => ({ ...prev, projects: data }))}
                    />
                  )}
                  {activeSection.id === 'skills' && (
                    <SkillsForm
                      data={resumeData.skills}
                      onChange={(data) => setResumeData(prev => ({ ...prev, skills: data }))}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Right Side - Preview */}
            <div className="lg:col-span-7 max-lg:mt-6">
              <button
                onClick={handleSaveResume}
                className="mb-4 flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg"
              >
                <Save size={16} /> Save
              </button>

              <Preview
                data={resumeData}
                template={resumeData.template}
                accentColor={resumeData.accentColor}
              />
            </div>
          </div>
        </div>
    </div>
  );
};

export default ResumeBuilder;