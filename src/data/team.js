// Each member can optionally include `photo`, `institution`, `bio`, `linkedin`, and
// `email` — when present, they show up on the card and in the popup that opens
// when someone clicks that person's photo. Leave any of these fields out and
// that part simply won't appear.
import imethPhoto from '../assets/team/imeth-illamperuma.png'
import perisaPhoto from '../assets/team/perisa-ashar.jpg'
import mateenPhoto from '../assets/team/mateen-abbasi.jpg'
import annikaPhoto from '../assets/team/annika-kumar.jpg'
import thomasPhoto from '../assets/team/thomas-wyskowski.jpg'
import davidPhoto from '../assets/team/david-agyare-tabbi.jpeg'
import diyaPhoto from '../assets/team/diya-barmecha.jpg'
import zarnabPhoto from '../assets/team/zarnab-ghumman.png'
import mirajPhoto from '../assets/team/miraj-ahmad.jpg'
import makaylaPhoto from '../assets/team/makayla-castiglione.jpg'
import angelaPhoto from '../assets/team/angela-kim.jpg'

export const boardMembers = [
  {
    name: 'Imeth Illamperuma',
    role: 'Board Member',
    institution: 'McMaster University',
    photo: imethPhoto,
    bio: 'Imeth Illamperuma is the Founder and Director of Illumina Health Lab, an international research initiative advancing cardiovascular medicine, artificial intelligence, and global health equity. An award-winning international researcher, he has led and contributed to interdisciplinary work across Harvard Medical School, Mayo Clinic, Stanford Medicine, and McMaster University. His research spans cardiometabolic health, responsible AI, digital health, and structural inequities in care. He is driven by a passion for building global research collaborations and translating rigorous evidence into clinically meaningful, policy-relevant solutions that improve health outcomes for underserved communities worldwide.',
    linkedin: 'https://www.linkedin.com/in/imeth-illamperuma-3a734a193/',
  },
  {
    name: 'Perisa Ashar',
    role: 'Board Member',
    institution: 'Georgia Institute of Technology',
    photo: perisaPhoto,
    bio: 'Perisa Ashar is an NSF Graduate Research Fellow and incoming Ph.D. student in Electrical and Computer Engineering at the Georgia Institute of Technology, and recently earned her M.S. in Biomedical Engineering from Duke University. Her research integrates artificial intelligence, biomedical engineering, epidemiology, and health policy to address challenges in cardiovascular medicine, digital health, and global health. She develops data-driven methods to improve clinical decision-making while investigating how structural and social determinants influence health outcomes. At Illumina Health Lab, she is interested in developing ethical AI solutions that advance health equity and improve healthcare systems worldwide.',
    linkedin: 'https://www.linkedin.com/in/perisa-ashar-345a47159/',
  },
  {
    name: 'Mateen Abbasi',
    role: 'Board Member',
    institution: 'Rutgers University — Ernest Mario School of Pharmacy',
    photo: mateenPhoto,
    bio: 'Mateen Abbasi is an Honors PharmD Candidate at Rutgers University Ernest Mario School of Pharmacy. His research interests center on equitable healthcare access, pharmacy practice, pharmacoeconomics, digital health, medical education, and global health policy. He is especially interested in healthcare barriers, medication affordability, direct-to-consumer pharmacies, and how policy can improve access for underserved communities. His work spans pharmacy-led care delivery, interprofessional education, AI-enabled chronic disease prevention, and health systems strategies across local and global settings. Through interdisciplinary collaborations, he aims to translate data-driven research into scalable pharmacopolicy solutions that reduce access gaps and improve patient outcomes for diverse populations.',
    linkedin: 'https://linkedin.com/in/mateenabbasi',
  },
]

// No senior researchers/PIs listed yet — add real entries here as they join.
// (TeamSection hides itself automatically when this is empty, so the Team
// page won't show a heading with nothing underneath it.)
export const seniorResearchers = []

export const coreTeam = [
  {
    name: 'Annika Kumar',
    role: 'Core Team Member',
    institution: 'Rice University',
    photo: annikaPhoto,
    bio: 'Annika Kumar is an incoming PhD student in bioengineering at Rice University. She earned her BS in Bioengineering with a Data Science option from the University of Washington and her MS in Biomedical Engineering from Duke University. Her MS research combined machine learning, wearable sensor data, and computational modeling to study diseases such as diabetes, COVID-19, and influenza, as well as force-sensitive protein-protein interactions. She is passionate about using computational approaches to model biological systems. Outside of research, she enjoys playing basketball, watching movies, and spending time with her dog.',
    linkedin: 'https://www.linkedin.com/in/annikakumar/',
  },
  {
    name: 'Thomas Wyskowski',
    role: 'Core Team Member',
    institution: 'Rutgers University',
    photo: thomasPhoto,
    bio: "Thomas Wyskowski is a recent Cell Biology & Neuroscience graduate of Rutgers University who's interested in research involving AI implementation, global equity, and cardiometabolic health. Thomas is currently an EMT at JFK University Medical Center, a hospice volunteer, and a Meals on Wheels volunteer. Thomas enjoys playing tennis and has recently picked up pickleball and rock climbing. Thomas aims to become an academic physician, hoping to educate and mentor the future generation of medicine. Thomas welcomes opportunities for research collaboration and interdisciplinary projects. If interested in collaborating, please feel free to reach out!",
    linkedin: 'https://www.linkedin.com/in/thomas-wyskowski-a248a0268',
  },
  {
    name: 'Miraj Ahmad',
    role: 'Core Team Member',
    institution: 'Harvard University',
    photo: mirajPhoto,
    bio: "Hi, I'm Miraj! I'm heading to Harvard as an incoming MS student in genetic epidemiology and statistical genetics. Before that, I was at Rutgers, where I got deep into epidemiological research and service leadership abroad. I've also founded a health-tech startup, and I'm working toward becoming a physician-engineer in the biotech space. At the core of it all, I'm driven by closing the gap between healthcare innovation and real patient impact, especially for underserved communities.",
    linkedin: 'https://www.linkedin.com/in/miraj-ahmad/',
  },
  {
    name: 'Makayla Castiglione',
    role: 'Core Team Member',
    institution: 'McMaster University',
    photo: makaylaPhoto,
    bio: 'I am an Honours Life Sciences student at McMaster University with a strong interest in biomedical innovation, public health, and healthcare research. I am passionate about exploring how scientific discoveries can be translated into meaningful improvements in health and patient care. Through my academic studies and extracurricular involvement, I enjoy engaging with interdisciplinary initiatives that address real-world healthcare challenges. I am excited to contribute to collaborative research, expand my understanding of the intersection of science and medicine, and continue learning alongside researchers who are dedicated to advancing health outcomes.',
    linkedin: 'https://www.linkedin.com/in/makaylacastiglione',
  },
  {
    name: 'Angela Kim',
    role: 'Core Team Member',
    institution: 'UC Berkeley',
    photo: angelaPhoto,
    bio: "Angela Kim graduated Summa Cum Laude from the University of California, Berkeley (UC Berkeley). She is a Rhodes Scholarship Finalist, a University of Cambridge Benefactors’ Scholarship Awardee, a National Udall Scholar, and Recipient of both the UC Berkeley Departmental Citation Award and the UC Berkeley Major Citation Award, which are the highest honors awarded to one student in the department and academic major. Angela’s interests include health policy, climate change, health systems, health disparities, artificial intelligence, and health innovation.",
    linkedin: 'https://www.linkedin.com/in/angela-kim1',
  },
  {
    name: 'Diya Barmecha',
    role: 'Core Team Member',
    institution: 'University College London',
    photo: diyaPhoto,
    bio: 'I am a third year biomedical science student and I am especially interested in the gut microbiome and its effects on health and disease. I have pursued this passion of mine for the past few years with university projects, passion projects and independent readings. I have interned at various companies in the past which align with this interest and I hope to continue to do so. My passion for healthcare stems from a need to help those around me in any way that I can.',
    linkedin: 'https://www.linkedin.com/in/diya-barmecha-809245188/',
  },
  {
    name: 'Zarnab Ghumman',
    role: 'Core Team Member',
    institution: 'McMaster University',
    photo: zarnabPhoto,
    bio: 'Zarnab Ghumman is an Engineering Physics student at McMaster University with interests in healthcare innovation, responsible technology, applied engineering systems, and digital health communication. At Illumina Health Lab, she contributes to research focused on artificial intelligence, cardiovascular medicine, and clinical reliability, while also supporting the lab\u2019s digital presence through website development. Her background in biomedical prototyping, technical testing, evidence synthesis, and interdisciplinary design shapes her practical, systems-focused approach. She is especially interested in building thoughtful, evidence-informed solutions that connect technical rigor with real-world impact for underserved communities.',
    linkedin: 'http://www.linkedin.com/in/zarnab-ghumman',
  },
]

export const generalMembers = [
  {
    name: 'David Agyare-Tabbi',
    role: 'General Member',
    institution: 'DeGroote School of Medicine',
    photo: davidPhoto,
    bio: 'I am a medical student at the Michael G. DeGroote School of Medicine at McMaster University, with a strong academic foundation in molecular biology, microbiology, and biochemistry, and a continued interest in infectious disease, public health, and health equity. My journey into medicine has been shaped by a commitment to understanding complex biological systems and applying that knowledge to improve patient care and address real-world health challenges. As I begin my medical training, I am particularly interested in opportunities at the intersection of clinical care, research, public health, and community impact. I am driven by a commitment to advancing health equity, strengthening science communication, and contributing to meaningful solutions that improve health outcomes locally and globally.',
    linkedin: 'https://www.linkedin.com/in/david-agyare-tabbi-a50228302/',
  },
]

export const webDevTeam = [
  {
    name: 'Zarnab Ghumman',
    role: 'Web Development Team',
    institution: 'McMaster University',
    photo: zarnabPhoto,
    bio: 'Zarnab Ghumman is an Engineering Physics student at McMaster University with interests in healthcare innovation, responsible technology, applied engineering systems, and digital health communication. At Illumina Health Lab, she contributes to research focused on artificial intelligence, cardiovascular medicine, and clinical reliability, while also supporting the lab\u2019s digital presence through website development. Her background in biomedical prototyping, technical testing, evidence synthesis, and interdisciplinary design shapes her practical, systems-focused approach. She is especially interested in building thoughtful, evidence-informed solutions that connect technical rigor with real-world impact for underserved communities.',
    linkedin: 'http://www.linkedin.com/in/zarnab-ghumman',
  },
]
