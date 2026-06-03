import React from 'react';

import profileImg from './assets/Image.png';
import geometryLogo from './assets/Logo.png';
import dotsPattern from './assets/Dots.png';

export default function PortfolioHero() {

    const projectsData = [
    {
      id: 1,
      title: 'ChertNodes',
      description: 'Minecraft servers hosting',
      tags: ['HTML', 'SCSS', 'Python', 'Flask'],
      // आप यहाँ अपनी इमेज का सही पाथ डाल सकते हैं (e.g., import chertImg from './assets/chert.png')
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop', 
      liveLink: '#',
      cachedLink: '#', // इसमें दोनों बटन हैं
    },
    {
      id: 2,
      title: 'ProtectX',
      description: 'Discord anti-crash bot',
      tags: ['React', 'Express', 'Discord.js', 'Node.js', 'HTML', 'SCSS', 'Python', 'Flask'],
      image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=500&auto=format&fit=crop',
      liveLink: '#',
      cachedLink: null, // इसमें सिर्फ Live बटन है
    },
    {
      id: 3,
      title: 'Kahoot Answers Viewer',
      description: 'Get answers to your kahoot quiz',
      tags: ['CSS', 'Express', 'Node.js'],
      image: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?q=80&w=500&auto=format&fit=crop',
      liveLink: '#',
      cachedLink: null, // इसमें सिर्फ Live बटन है
    }
  ];
  return (
    <div className="min-h-screen bg-[#282c33] text-white font-mono selection:bg-[#c778dd] selection:text-black overflow-x-hidden">
      
      {/* 1. Header / Navbar */}
      <header className="flex justify-between items-center px-8 py-6 max-w-6xl mx-auto z-50 relative">
        <div className="flex items-center gap-2 font-bold text-lg tracking-wider cursor-pointer">
          <span className="text-[#c778dd]">❖</span> Elias
        </div>
        <nav className="flex items-center gap-8 text-gray-400 text-sm">
          <a href="#home" className="text-white font-medium hover:text-[#c778dd] transition-colors">
            <span className="text-[#c778dd]">#</span>home
          </a>
          <a href="#works" className="hover:text-[#c778dd] transition-colors">
            <span className="text-[#c778dd]">#</span>works
          </a>
          <a href="#about-me" className="hover:text-[#c778dd] transition-colors">
            <span className="text-[#c778dd]">#</span>about-me
          </a>
          <a href="#contacts" className="hover:text-[#c778dd] transition-colors">
            <span className="text-[#c778dd]">#</span>contacts
          </a>
          <select className="bg-transparent border-none text-gray-400 focus:outline-none cursor-pointer">
            <option value="en" className="bg-[#282c33]">EN</option>
          </select>
        </nav>
      </header>

      {/* Floating Left Socials */}
      <div className="hidden lg:flex flex-col items-center gap-4 fixed left-5 top-0 z-50">
        <div className="w-[1px] h-40 bg-gray-500"></div>
        {/* Placeholder icons for GitHub, Figma, Dribbble */}
        <a href="#" className="text-gray-400 hover:text-[#c778dd] transition-colors text-lg">📁</a>
        <a href="#" className="text-gray-400 hover:text-[#c778dd] transition-colors text-lg">🌐</a>
        <a href="#" className="text-gray-400 hover:text-[#c778dd] transition-colors text-lg">🎨</a>
      </div>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-8 pt-12 pb-24 relative">
        
        {/* 2. Hero Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative mb-24">
          
          {/* Left Text Side */}
          <div className="space-y-6 z-10">
            <h1 className="text-3xl md:text-4xl font-semibold leading-relaxed">
              Elias is a <span className="text-[#c778dd]">web designer</span> and{' '}
              <span className="text-[#c778dd]">front-end developer</span>
            </h1>
            <p className="text-gray-400 text-sm md:text-base max-w-md leading-relaxed">
              He crafts responsive websites where technologies meet creativity
            </p>
            <button className="border border-[#c778dd] text-white px-4 py-2 text-sm hover:bg-[#c778dd]/10 transition-all font-medium">
              Contact me !!
            </button>
          </div>

          {/* Right Assets Side */}
         {/* Right Assets Side */}
<div className="relative flex flex-col items-center justify-center select-none">
  
  {/* Logo.png - कैरेक्टर के पीछे लेफ्ट साइड में */}
  <img 
    src={geometryLogo} 
    alt="Geometry Outline" 
    className="absolute top-17 left-5 w-40 h-40 opacity-80 object-contain  pointer-events-none"
  />
  
  {/* Dots.png - हुडी के दाईं तरफ नीचे */}
  <img 
    src={dotsPattern} 
    alt="Dots Pattern" 
    className="absolute bottom-20 right-4 w-20 h-20 opacity-70 object-contain z-20 pointer-events-none"
  />

  {/* Image.png - अब यह पूरी बड़ी दिखेगी और नीचे स्टेटस बार से टच होगी */}
  <div className="relative w-full max-w-[440px] flex items-end justify-center">
    <img 
      src={profileImg} 
      alt="Elias Profile" 
      className="w-full h-auto object-contain z-10"
    />
  </div>

  {/* Status Bar Indicator */}
  <div className="border border-gray-600 bg-[#282c33] px-4 py-2 mt-[-1px] w-full max-w-[440px] flex items-center gap-3 text-xs text-gray-400 z-30">
    <span className="w-3 h-3 bg-[#c778dd] inline-block animate-pulse"></span>
    <p>
      Currently working on <span className="text-white font-bold">Portfolio</span>
    </p>
  </div>
</div>
        </section>

        {/* 3. Quote Section */}
        <section className="max-w-2xl mx-auto my-24 relative">
          <div className="border border-gray-600 p-8 relative">
            {/* Custom Quote Top Symbol */}
            <span className="absolute -top-4 left-6 bg-[#282c33] px-2 text-4xl text-gray-500 select-none">“</span>
            
            <p className="text-lg md:text-xl font-medium text-center tracking-wide text-gray-200">
              With great power comes great electricity bill
            </p>
            
            {/* Custom Quote Bottom Symbol */}
            <span className="absolute -bottom-8 right-6 bg-[#282c33] px-2 text-4xl text-gray-500 select-none">”</span>
          </div>
          {/* Quote Author */}
          <div className="flex justify-end">
            <div className="border border-t-0 border-gray-600 p-3 text-sm text-gray-400 bg-[#282c33]">
              - Dr. Who
            </div>
          </div>
        </section>

        {/* 4. Projects Section Trigger */}
      <section id="works" className="mt-28">
          {/* Section Heading with Line */}
          <div className="flex justify-between items-center border-b border-gray-700 pb-4 mb-12">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-semibold tracking-wider">
                <span className="text-[#c778dd]">#</span>projects
              </h2>
              <div className="h-[1px] bg-[#c778dd] w-32 md:w-96 hidden sm:block"></div>
            </div>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2">
              View all <span className="text-[#c778dd]">~~&gt;</span>
            </a>
          </div>

          {/* Projects Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsData.map((project) => (
              <div 
                key={project.id} 
                className="border border-gray-600 bg-[#282c33] flex flex-col hover:border-gray-400 transition-colors duration-300"
              >
                {/* Project Image Box */}
                <div className="w-full h-48 overflow-hidden border-b border-gray-600 bg-gray-900 relative">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover opacity-90"
                  />
                </div>

                {/* Technology Tags Compartment */}
                <div className="p-2 border-b border-gray-600 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-400">
                  {project.tags.map((tag, index) => (
                    <span key={index}>{tag}</span>
                  ))}
                </div>

                {/* Content & Action Buttons */}
                <div className="p-4 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-medium tracking-wide text-white">{project.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{project.description}</p>
                  </div>

                  {/* Buttons Box */}
                  <div className="flex items-center gap-4 pt-2">
                    <a 
                      href={project.liveLink} 
                      className="border border-[#c778dd] text-white text-sm px-4 py-1.5 font-medium hover:bg-[#c778dd]/10 transition-colors flex items-center gap-1"
                    >
                      Live <span className="text-xs">&lt;~&gt;</span>
                    </a>
                    
                    {project.cachedLink && (
                      <a 
                        href={project.cachedLink} 
                        className="border border-gray-500 text-gray-400 text-sm px-4 py-1.5 font-medium hover:bg-gray-500/10 hover:text-white transition-colors flex items-center gap-1"
                      >
                        Cached <span className="text-xs">&gt;</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>



        {/* 5. Skills Section */}
<section id="skills" className="mt-28 max-w-6xl mx-auto px-8 font-mono bg-[#282c33] text-white">
  
  {/* Section Heading with Line */}
  <div className="flex items-center gap-4 border-b border-gray-700 pb-4 mb-12">
    <h2 className="text-2xl font-semibold tracking-wider">
      <span className="text-[#c778dd]">#</span>skills
    </h2>
    <div className="h-[1px] bg-[#c778dd] w-32 md:w-64 hidden sm:block"></div>
  </div>

  {/* Main Content Layout Grid */}
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
    
    {/* LEFT SIDE: Decorative Background Elements (Shapes & Dots) */}
    <div className="hidden md:grid lg:col-span-5 grid-cols-2 gap-y-16 gap-x-8 relative pt-4 opacity-70 select-none">
      
      {/* Top Left: Dots Pattern */}
      <div className="w-16 h-16 opacity-50">
        <img src={dotsPattern} alt="Dots" className="w-full h-full object-contain" />
      </div>

      {/* Top Right: Outline Square Box */}
      <div className="w-24 h-24 border border-gray-600 justify-self-end mt-4"></div>

      {/* Bottom Left: Logo Outline Shape (Purple) */}
      <div className="w-28 h-28 -mt-6">
        <img src={geometryLogo} alt="Logo Outline" className="w-full h-full object-contain" />
      </div>

      {/* Bottom Middle: Second Dots Pattern */}
      <div className="w-16 h-16 opacity-50 self-end -ml-12">
        <img src={dotsPattern} alt="Dots" className="w-full h-full object-contain" />
      </div>

      {/* Bottom Right: Small Outline Square Box */}
      <div className="w-14 h-14 border border-gray-600 absolute bottom-0 right-12"></div>
    </div>


    {/* RIGHT SIDE: Terminal/Code Style Skills Blocks */}
    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      
      {/* Block 1: Languages */}
      <div className="border border-gray-600 h-fit">
        <div className="border-b border-gray-600 p-2 font-semibold text-sm">Languages</div>
        <div className="p-2 text-xs text-gray-400 flex flex-wrap gap-2 leading-relaxed">
          <span>TypeScript</span> <span>Lua</span> <span>Python</span> <span>JavaScript</span>
        </div>
      </div>

      {/* Block 2: Databases */}
      <div className="border border-gray-600 h-fit">
        <div className="border-b border-gray-600 p-2 font-semibold text-sm">Databases</div>
        <div className="p-2 text-xs text-gray-400 flex flex-wrap gap-2 leading-relaxed">
          <span>SQLite</span> <span>PostgreSQL</span> <span>Mongo</span>
        </div>
      </div>

      {/* Block 3: Tools */}
      <div className="border border-gray-600 h-fit sm:row-span-2">
        <div className="border-b border-gray-600 p-2 font-semibold text-sm">Tools</div>
        <div className="p-2 text-xs text-gray-400 flex flex-wrap gap-2 leading-relaxed">
          <span>VSCode</span> <span>Neovim</span> <span>Linux</span> <span>Figma</span> 
          <span>XFCE</span> <span>Arch</span> <span>Git</span> <span>Font Awesome</span>
        </div>
      </div>

      {/* Block 4: Other */}
      <div className="border border-gray-600 h-fit">
        <div className="border-b border-gray-600 p-2 font-semibold text-sm">Other</div>
        <div className="p-2 text-xs text-gray-400 flex flex-wrap gap-2 leading-relaxed">
          <span>HTML</span> <span>CSS</span> <span>EJS</span> <span>SCSS</span> 
          <span>REST</span> <span>Jinja</span>
        </div>
      </div>

      {/* Block 5: Frameworks */}
      <div className="border border-gray-600 h-fit">
        <div className="border-b border-gray-600 p-2 font-semibold text-sm">Frameworks</div>
        <div className="p-2 text-xs text-gray-400 flex flex-wrap gap-2 leading-relaxed">
          <span>React</span> <span>Vue</span> <span>Disnake</span> <span>Discord.js</span> 
          <span>Flask</span> <span>Express.js</span>
        </div>
      </div>

    </div>

  </div>
</section>



{/* 6. About Me Section */}
<section id="about-me" className="mt-28 max-w-6xl mx-auto px-8 font-mono bg-[#282c33] text-white">
  
  {/* Section Heading with Line */}
  <div className="flex items-center gap-4 border-b border-gray-700 pb-4 mb-12">
    <h2 className="text-2xl font-semibold tracking-wider">
      <span className="text-[#c778dd]">#</span>about-me
    </h2>
    <div className="h-[1px] bg-[#c778dd] w-32 md:w-64 hidden sm:block"></div>
  </div>

  {/* Main Layout Grid */}
  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
    
    {/* LEFT SIDE: Text Content */}
    <div className="md:col-span-7 space-y-8 z-10">
      <p className="text-base text-gray-200">Hello, i’m Elias!</p>
      
      <div className="space-y-6 text-sm md:text-base text-gray-400 leading-relaxed">
        <p>
          I’m a self-taught front-end developer based in Kyiv, Ukraine. 
          I can develop responsive websites from scratch and raise them into 
          modern user-friendly web experiences.
        </p>
        <p>
          Transforming my creativity and knowledge into a websites has been my 
          passion for over a year. I have been helping various clients to establish 
          their presence online. I always strive to learn about the newest 
          technologies and frameworks.
        </p>
      </div>

      {/* Read More Button */}
      <div className="pt-2">
        <button className="border border-[#c778dd] text-white px-4 py-2 text-sm hover:bg-[#c778dd]/10 transition-all font-medium flex items-center gap-2">
          Read more <span className="text-[#c778dd]">→</span>
        </button>
      </div>
    </div>

    {/* RIGHT SIDE: Character Image & Background Dots */}
    <div className="md:col-span-5 relative flex justify-center items-center select-none mt-12 md:mt-0">
      
      {/* Top Left Dots Overlay */}
      <img 
        src={dotsPattern} 
        alt="Dots Top" 
        className="absolute top-12 left-4 w-16 h-16 opacity-40 object-contain pointer-events-none z-0"
      />

      {/* Bottom Right Dots Overlay */}
      <img 
        src={dotsPattern} 
        alt="Dots Bottom" 
        className="absolute bottom-24 right-4 w-16 h-16 opacity-40 object-contain pointer-events-none z-0"
      />

      {/* About Character Image Wrapper */}
      <div className="relative z-10 w-full max-w-[320px] flex flex-col items-center">
        {/* अगर आपके पास इस सेक्शन के लिए अलग इमेज (image_58b7db.png वाली) है तो उसका पाथ यहाँ डालिए, अन्यथा profileImg का भी इस्तेमाल कर सकते हैं */}
        <img 
          src={profileImg} 
          alt="Elias About" 
          className="w-full h-auto object-contain border-b border-[#c778dd]"
        />
      </div>

    </div>

  </div>
</section>

{/* 7. Contacts Section */}
<section id="contacts" className="mt-28 max-w-6xl mx-auto px-8 font-mono bg-[#282c33] text-white">
  
  {/* Section Heading with Line */}
  <div className="flex items-center gap-4 border-b border-gray-700 pb-4 mb-12">
    <h2 className="text-2xl font-semibold tracking-wider">
      <span className="text-[#c778dd]">#</span>contacts
    </h2>
    <div className="h-[1px] bg-[#c778dd] w-32 md:w-64 hidden sm:block"></div>
  </div>

  {/* Main Grid Layout */}
  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
    
    {/* LEFT SIDE: Short Message Description */}
    <div className="md:col-span-7">
      <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-lg">
        I’m interested in freelance opportunities. However, 
        if you have other request or question, don’t 
        hesitate to contact me
      </p>
    </div>

    {/* RIGHT SIDE: Terminal-style "Message me here" Box */}
    <div className="md:col-span-5 flex justify-start md:justify-end">
      <div className="border border-gray-600 p-4 bg-[#282c33] w-full max-w-[300px] space-y-4">
        
        {/* Box Title */}
        <h3 className="font-semibold text-sm text-white tracking-wide">
          Message me here
        </h3>
        
        {/* Contact Links List */}
        <div className="space-y-3 text-xs md:text-sm text-gray-400">
          
          {/* Discord Contact */}
          <div className="flex items-center gap-2.5 hover:text-white transition-colors cursor-pointer">
            {/* Discord Icon Shape (Using custom unicode or SVG) */}
            <span className="text-base select-none">💬</span>
            <span className="tracking-wide">!Elias#3519</span>
          </div>

          {/* Email Contact */}
          <a 
            href="mailto:elias@elias.me" 
            className="flex items-center gap-2.5 hover:text-white transition-colors"
          >
            {/* Email Icon Shape */}
            <span className="text-base select-none">✉</span>
            <span className="tracking-wide">elias@elias.me</span>
          </a>

        </div>

      </div>
    </div>

  </div>
</section>


{/* 8. Footer Section */}
<footer className="border-t border-gray-700 mt-32 bg-[#282c33] font-mono text-white">
  <div className="max-w-6xl mx-auto px-8 py-8 space-y-12">
    
    {/* Top Footer Content */}
    <div className="flex flex-col sm:flex-row justify-between items-start gap-6 sm:gap-4">
      
      {/* Left Box: Logo, Email, and Role */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {/* Logo & Name */}
          <div className="flex items-center gap-2 font-bold text-base tracking-wider">
            <span className="text-[#c778dd]">❖</span> Elias
          </div>
          {/* Email Address */}
          <span className="text-gray-400 text-xs md:text-sm">
            elias@elias-dev.ml
          </span>
        </div>
        {/* Short Bio Tagline */}
        <p className="text-gray-300 text-sm">
          Web designer and front-end developer
        </p>
      </div>

      {/* Right Box: Media Icons */}
      <div className="space-y-3">
        <h3 className="text-lg font-medium tracking-wide text-white sm:text-right">
          Media
        </h3>
        {/* Social Icons (GitHub, Figma, Discord) */}
        <div className="flex items-center gap-4 text-gray-400 text-lg sm:justify-end">
          <a href="#" className="hover:text-white transition-colors">📁</a> {/* GitHub Placeholder */}
          <a href="#" className="hover:text-white transition-colors">🌐</a> {/* Figma Placeholder */}
          <a href="#" className="hover:text-white transition-colors">💬</a> {/* Discord/Media Placeholder */}
        </div>
      </div>

    </div>

    {/* Bottom Box: Copyright Disclaimer */}
    <div className="text-center text-xs md:text-sm text-gray-500 pt-4">
      © Copyright 2026. Made by Elias
    </div>

  </div>
</footer>

      </main>
    </div>
  );
}