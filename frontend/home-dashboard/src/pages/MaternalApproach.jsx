import React from 'react'

function MaternalApproach() {
  const sections = [
    {
      id: 'A',
      title: 'Prenatal Care and Emotional Support',
      content: 'Prenatal care is essential for the health of both mother and baby. Regular checkups, balanced nutrition, and emotional support help in smooth fetal development. Connecting with other moms and healthcare providers can reduce anxiety and foster confidence.'
    },
    {
      id: 'B',
      title: 'Nutrition During Pregnancy',
      content: 'A balanced diet rich in iron, calcium, folate, and protein helps expecting mothers stay strong and nourished. Hydration and mindful eating also play crucial roles in keeping energy levels up and ensuring a healthy pregnancy.'
    },
    {
      id: 'C',
      title: 'Exercise and Physical Wellness',
      content: 'Staying active with doctor-approved exercises like walking, prenatal yoga, or stretching boosts circulation and reduces fatigue. It also prepares the body for labor and delivery, helping reduce complications.'
    },
    {
      id: 'D',
      title: 'Postpartum Recovery Techniques',
      content: 'Recovery after childbirth is just as important as prenatal care. Practices like pelvic floor exercises, balanced diet, emotional rest, and open conversations help new mothers heal physically and emotionally.'
    },
    {
      id: 'E',
      title: 'Bonding With the Baby',
      content: 'Skin-to-skin contact, gentle massages, lullabies, and talking to your baby strengthen the emotional bond. These approaches help the child feel secure and supported while helping the mother feel deeply connected.'
    },
    {
      id: 'F',
      title: 'Mental Health and Self-Care',
      content: 'Motherhood is beautiful but overwhelming at times. Practices like journaling, meditation, and seeking help when needed can ease stress. Remember: taking care of yourself is part of taking care of your baby.'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-pink-50 to-white p-6 font-sans">
      {/* Page Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-pink-700 mb-12 pt-4 tracking-tight drop-shadow-lg">MATERNAL APPROACH</h1>

      {/* Content Sections */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 gap-10">
        {sections.map((section) => (
          <div key={section.id} className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-pink-700 mb-3">
              {section.id}. {section.title}
            </h2>
            <p className="text-base text-gray-700 font-medium">{section.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MaternalApproach 