import React from 'react'

function About() {
  const sections = [
    {
      text: `Embracing motherhood is one of the most significant contributions to society. Mothers play a crucial role in shaping the future by nurturing and guiding their children. Their love, patience, and dedication create a strong foundation for the next generation. The impact of a mother's influence extends beyond the family, reaching into the community and society at large. By embracing motherhood, women contribute to the development of compassionate, responsible, and well-rounded individuals who can make positive changes in the world.`,
      img: 'https://storage.googleapis.com/a1aa/image/9oonBm5yUM5nPFg6b0IvpuM5rLus4LGLcBegQPR1d2HZJABKA.jpg',
      alt: `A mother holding her child with a quote: 'Mothers hold the power to change the world.'`,
      quote: 'Mothers hold the power to change the world.'
    },
    {
      text: `Mothers are confident leaders who inspire change. They lead by example, demonstrating strength, resilience, and compassion. In their daily lives, mothers make countless decisions that shape the lives of their children and families. Their leadership extends beyond the home, influencing workplaces, communities, and society. By embracing their role as leaders, mothers can inspire others to take action and make a difference. Their unique perspective and experiences bring valuable insights and solutions to various challenges.`,
      img: 'https://storage.googleapis.com/a1aa/image/8lRuBgdSX8YPGJt3sNuCfsZlpvP40ygo6ArPMSY9hELXJABKA.jpg',
      alt: `A mother guiding her child with a quote: 'Leadership begins at home with a mother's love.'`,
      quote: `Leadership begins at home with a mother's love.`
    },
    {
      text: `The importance of mothers as leaders cannot be overstated. They possess a unique combination of empathy, intuition, and strength that enables them to guide their families and communities effectively. Mothers are often the first to recognize and address the needs of their children, providing support and encouragement. Their leadership style is characterized by collaboration, communication, and a deep understanding of human nature. By embracing their role as leaders, mothers can create positive change and inspire others to do the same.`,
      img: 'https://storage.googleapis.com/a1aa/image/MYoYQYkyUyLlE1zyDsgWFibLucEWt0rgaiJryWKkPeDbJABKA.jpg',
      alt: `A mother and child smiling with a quote: 'The future belongs to confident and compassionate leaders.'`,
      quote: 'The future belongs to confident and compassionate leaders.'
    },
    {
      text: `Motherhood is a journey of growth and self-discovery. As mothers navigate the challenges and joys of raising children, they develop new skills and strengths. This journey is not only about nurturing their children but also about personal growth and development. Mothers learn to balance multiple roles, manage time effectively, and adapt to changing circumstances. By embracing motherhood, women can discover their true potential and become more confident and capable individuals.`,
      img: 'https://storage.googleapis.com/a1aa/image/aTlvG4knDtLeZigeOOaEbPUGeQeSZPe4P0EgS5nbrAQGWCQgC.jpg',
      alt: `A mother playing with her child with a quote: 'Empowerment begins with a mother's love.'`,
      quote: `Empowerment begins with a mother's love.`
    },
    {
      text: `The role of mothers in society is invaluable. They are the backbone of families, providing love, support, and guidance. Mothers contribute to the well-being of their children and the stability of their families. Their influence extends beyond the home, impacting the community and society. By embracing motherhood, women can make a significant difference in the world. Their dedication and commitment to their families create a ripple effect that benefits everyone.`,
      img: 'https://storage.googleapis.com/a1aa/image/XymeZdt7aAzEAiCEZNJ6hEjQcF0YOkJdJQMaguSSge60SACUA.jpg',
      alt: `A mother hugging her child with a quote: 'A mother's love shapes the future.'`,
      quote: `A mother's love shapes the future.`
    },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-200 via-pink-50">
      <div className="w-full bg-gradient-to-br from-pink-200 via-pink-50 to-white p-4 md:p-14 animate-fade-in">
        <h1 className="text-5xl font-extrabold text-pink-700 mb-12 text-center tracking-tight drop-shadow-lg">About Mom & Me Wellness</h1>
        <div className="space-y-16">
          {sections.map((section, idx) => (
            <div key={idx} className={`flex flex-col md:flex-row items-center md:items-stretch gap-10 md:gap-16 ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              <div className="flex-shrink-0 flex justify-center md:justify-start w-full md:w-64">
                <img
                  src={section.img}
                  alt={section.alt}
                  className="rounded-2xl shadow-xl object-cover w-44 h-44 md:w-60 md:h-60 border-4 border-pink-100"
                />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <blockquote className="text-pink-500 font-bold italic mb-4 text-xl md:text-2xl border-l-4 border-pink-300 pl-4">“{section.quote}”</blockquote>
                <p className="text-gray-700 text-lg md:text-xl leading-relaxed font-medium">{section.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 border-t-2 border-pink-300 pt-8 text-center">
          <span className="inline-block px-6 py-3 bg-pink-100 rounded-lg text-pink-600 font-bold shadow-md text-lg md:text-xl">Mothers are the unsung heroes of society. Their love, wisdom, and strength are the foundation of strong families and communities.</span>
        </div>
      </div>
    </div>
  );
}

export default About; 