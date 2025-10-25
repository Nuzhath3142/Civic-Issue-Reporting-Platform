import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/authcontext'
import { toast } from 'react-toastify'

function Pregnancy() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    country: '',
    height: '',
    weight: '',
    month: '',
    allergies: ''
  })
  const [formVisible, setFormVisible] = useState(false)
  const { user, updateProfile, profileData, getProfileData } = useAuth();

  // Helper to check if profile is filled
  const isProfileFilled = profileData && profileData.age && profileData.country && profileData.month && profileData.age !== '' && profileData.country !== '' && profileData.month !== '';
  useEffect(() => {
    if (user && user.name) {
      setFormData(prev => ({
        ...prev,
        name: user.name
      }))
    }
  }, [user])

  // Fetch and prefill form with profileData on mount
  useEffect(() => {
    async function fetchAndPrefill() {
      await getProfileData();
      if (profileData) {
        setFormData(prev => ({
          ...prev,
          ...profileData
        }));
      }
    }
    fetchAndPrefill();
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Send PATCH/PUT request to backend to update user profile using context
    if (user && user.token) {
      try {
        const response = await updateProfile({
          age: formData.age,
          country: formData.country,
          height: formData.height,
          weight: formData.weight,
          month: formData.month,
          allergies: formData.allergies,
        });
        if (response.success) {
          toast.success('Profile updated!');
          setFormVisible(false); // Hide form after update
        } else {
          toast.error(response.message || 'Failed to update profile');
        }
      } catch {
        toast.error('Failed to update profile');
      }
    }
  }

  // Helper to generate extra info from profileData
  function getExtraInfo(profileData) {
    let ageTitle = '';
    let ageImmunity = '';
    let ageStrength = '';
    let countryTitle = '';
    let countrySeasons = [];
    let monthTitle = '';
    let monthTips = [];

    // Age information logic
    switch (profileData.age) {
      case '18-21':
        ageTitle = 'Age: 18-21 Years';
        ageImmunity = 'Immunity: Generally robust as the immune system is still in its prime. Younger women often have a quicker recovery from infections but may be more susceptible to illnesses if they lack proper nutrition or prenatal care.';
        ageStrength = 'Strength: Physical resilience tends to be high, but lack of awareness about prenatal health can lead to deficiencies in iron, folic acid, or other vital nutrients, potentially affecting energy levels.';
        break;
      case '22-27':
        ageTitle = 'Age: 22-27 Years';
        ageImmunity = 'Immunity: Still strong, provided the woman is in good health. This age group is often optimal for pregnancy due to better overall health and fewer chronic conditions.';
        ageStrength = 'Strength: Higher stamina and physical strength, making it easier to manage pregnancy-related fatigue. Proper prenatal care usually helps maintain immunity and strength.';
        break;
      case '28-36':
        ageTitle = 'Age: 28-36 Years';
        ageImmunity = 'Immunity: Slight decline in immune efficiency may start, but generally manageable with a healthy lifestyle and prenatal care. Risk of autoimmune conditions might slightly increase.';
        ageStrength = 'Strength: Physical strength is good, but energy levels might require more conscious management through balanced nutrition and exercise. Risk of complications like gestational diabetes or hypertension begins to increase.';
        break;
      case '37-42':
        ageTitle = 'Age: 37-42 Years';
        ageImmunity = 'Immunity: A more noticeable decline in immune response due to age, making infections harder to fend off. Conditions like thyroid disorders or autoimmune diseases might also be more prevalent.';
        ageStrength = 'Strength: Strength and energy levels might be lower due to natural aging and lifestyle factors. Risk of pregnancy complications like preeclampsia or gestational diabetes increases.';
        break;
      case '43 and above':
        ageTitle = 'Age: 43 Years and Above';
        ageImmunity = 'Immunity: Immune function is reduced significantly, and women are more susceptible to infections and chronic conditions. Healing and recovery times are longer.';
        ageStrength = 'Strength: Physical resilience is lower, and fatigue is more pronounced. The risk of complications, including preterm labor, chromosomal abnormalities in the baby, and maternal health issues, is significantly higher.';
        break;
      default:
        break;
    }
    // Country information logic
    switch (profileData.country) {
      case 'India':
        countryTitle = 'Country: India';
        countrySeasons = [
          'Summer: Stay hydrated, avoid heat, and eat light meals with seasonal fruits.',
          'Winter: Stay warm, moisturize skin, and include nutrient-dense foods.',
          'Autumn: Manage allergies and include seasonal fruits like guava and pomegranate.'
        ];
        break;
      case 'Pakistan':
        countryTitle = 'Country: Pakistan';
        countrySeasons = [
          "Similar to India's guidance for all seasons with a focus on clean water and warm teas."
        ];
        break;
      case 'China':
        countryTitle = 'Country: China';
        countrySeasons = [
          'Summer: Avoid outdoor activities during high humidity, and opt for air-conditioned spaces.',
          'Winter: Include warm soups and use humidifiers.',
          'Autumn: Seasonal fruits like pears and apples are encouraged for hydration.'
        ];
        break;
      case 'Saudi Arabia':
        countryTitle = 'Country: Saudi Arabia';
        countrySeasons = [
          'Summer: Consume up to 3 liters of water daily and stay indoors.',
          'Winter: Consume warm beverages and ensure ventilation.',
          'Autumn: Avoid dust storms and monitor hydration levels.'
        ];
        break;
      case 'America':
        countryTitle = 'Country: America';
        countrySeasons = [
          'Summer: Stay hydrated and monitor for heat exhaustion.',
          'Winter: Wear insulated clothing and prevent slips on icy surfaces.',
          'Autumn: Manage allergies and include seasonal foods like pumpkins.'
        ];
        break;
      default:
        break;
    }
    // Month information logic
    switch (profileData.month) {
      case '0-2':
        monthTitle = 'Month: 0-2 Months';
        monthTips = [
          'Start regular prenatal check-ups.',
          'Take prescribed vitamins and manage nausea with small meals.',
          'Avoid smoking, alcohol, and heavy objects.'
        ];
        break;
      case '3-4':
        monthTitle = 'Month: 3-4 Months';
        monthTips = [
          'Gradually increase calorie intake and engage in light prenatal exercises.',
          'Avoid raw foods and prioritize dental care.'
        ];
        break;
      case '5-6':
        monthTitle = 'Month: 5-6 Months';
        monthTips = [
          'Watch for early signs of preterm labor and focus on posture.',
          'Avoid lying flat for long periods.'
        ];
        break;
      case '7-8':
        monthTitle = 'Month: 7-8 Months';
        monthTips = [
          'Monitor fetal movements and pack your hospital bag.',
          'Avoid salty foods and strenuous activities.'
        ];
        break;
      case '9':
        monthTitle = 'Month: 9 Months';
        monthTips = [
          'Focus on labor preparation and postpartum care.',
          'Stay hydrated and eat high-fiber foods.'
        ];
        break;
      default:
        break;
    }
    return { ageTitle, ageImmunity, ageStrength, countryTitle, countrySeasons, monthTitle, monthTips };
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-pink-50 to-white font-roboto flex items-center justify-center py-8 px-2">
      <div className="w-full max-w-2xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-pink-700 mb-8 tracking-tight drop-shadow-lg">Pregnancy Information Form</h1>
        {(isProfileFilled && !formVisible) ? (
          <div>
            {/* Profile info */}
            <div className="bg-white p-8 rounded-2xl shadow-xl mb-6">
              <h2 className="text-2xl font-bold mb-4 text-pink-700 text-center">Your Profile Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><span className="font-semibold text-pink-700">Name:</span> {profileData.name || '-'}</div>
                <div><span className="font-semibold text-pink-700">Age:</span> {profileData.age || '-'}</div>
                <div><span className="font-semibold text-pink-700">Country:</span> {profileData.country || '-'}</div>
                <div><span className="font-semibold text-pink-700">Height:</span> {profileData.height || '-'}</div>
                <div><span className="font-semibold text-pink-700">Weight:</span> {profileData.weight || '-'}</div>
                <div><span className="font-semibold text-pink-700">Month:</span> {profileData.month || '-'}</div>
                <div><span className="font-semibold text-pink-700">Allergies:</span> {profileData.allergies || '-'}</div>
              </div>
              {/* Edit button inside info card, aligned right */}
              <div className="flex justify-end mt-8">
                <button
                  className="bg-pink-500 text-white font-bold py-2 px-8 rounded-lg hover:bg-pink-600 transition-colors text-lg shadow-md"
                  onClick={() => setFormVisible(true)}
                >
                  Edit
                </button>
              </div>
            </div>
            {/* Show extra info from switch/case */}
            {(() => {
              const extra = getExtraInfo(profileData);
              return (
                <div className="mt-8 p-8 bg-pink-50 rounded-2xl shadow-xl">
                  <h2 className="text-2xl font-bold mb-4 text-pink-700 text-center">Pregnancy Guidance</h2>
                  {extra.ageTitle && (
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-pink-700 mb-1">{extra.ageTitle}</h3>
                      <p className="text-gray-700 mb-1">{extra.ageImmunity}</p>
                      <p className="text-gray-700">{extra.ageStrength}</p>
                    </div>
                  )}
                  {extra.countryTitle && (
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-pink-700 mb-1">{extra.countryTitle}</h3>
                      <ul className="list-disc list-inside text-gray-700">
                        {extra.countrySeasons.map((tip, idx) => (
                          <li key={idx}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {extra.monthTitle && (
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-pink-700 mb-1">{extra.monthTitle}</h3>
                      <ul className="list-disc list-inside text-gray-700">
                        {extra.monthTips.map((tip, idx) => (
                          <li key={idx}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <p className="text-pink-600 font-bold text-center text-xl mt-6">
                    THE MOMENT A CHILD IS BORN, THE MOTHER IS ALSO BORN
                  </p>
                </div>
              );
            })()}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white relative p-8 rounded-2xl shadow-xl">

         
            <button
              type="button"
              className={`absolute ${user ? 'flex' : 'hidden'} top-2 left-2 items-center text-pink-600 hover:text-pink-800`}
              onClick={() => setFormVisible(false)}
              aria-label="Back"
            >
              <i className="fas fa-arrow-left text-xl"></i>
            </button>
            <p className="mb-6 bg-pink-100 text-pink-700 font-semibold rounded-lg px-4 py-2 text-center text-lg shadow-sm border border-pink-200">Additional Info</p>
                 
            <div className="mb-4">
              <label htmlFor="age" className="block text-gray-700 font-bold mb-2">Age</label>
              <select
                id="age"
                name="age"
                className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition"
                required
                value={formData.age}
                onChange={handleChange}
              >
                <option value="">Select Age</option>
                <option value="18-21">18-21</option>
                <option value="22-27">22-27</option>
                <option value="28-36">28-36</option>
                <option value="37-42">37-42</option>
                <option value="43 and above">43 and above</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="country" className="block text-gray-700 font-bold mb-2">Country/City</label>
              <select
                id="country"
                name="country"
                className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition"
                required
                value={formData.country}
                onChange={handleChange}
              >
                <option value="">Select Country</option>
                <option value="India">India</option>
                <option value="Pakistan">Pakistan</option>
                <option value="China">China</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="America">America</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="height" className="block text-gray-700 font-bold mb-2">Height</label>
              <input
                type="text"
                id="height"
                name="height"
                className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition"
                required
                value={formData.height}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="weight" className="block text-gray-700 font-bold mb-2">Weight</label>
              <input
                type="number"
                id="weight"
                name="weight"
                className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition"
                required
                value={formData.weight}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="month" className="block text-gray-700 font-bold mb-2">Month of Pregnancy</label>
              <select
                id="month"
                name="month"
                className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition"
                required
                value={formData.month}
                onChange={handleChange}
              >
                <option value="">Select Month</option>
                <option value="0-2">0-2</option>
                <option value="3-4">3-4</option>
                <option value="5-6">5-6</option>
                <option value="7-8">7-8</option>
                <option value="9">9</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="allergies" className="block text-gray-700 font-bold mb-2">Allergies (if any)</label>
              <input
                type="text"
                id="allergies"
                name="allergies"
                className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition"
                value={formData.allergies}
                onChange={handleChange}
              />
            </div>
            <div className="text-center">
              <button type="submit" className="bg-pink-600 text-white font-bold py-2 px-8 rounded-lg hover:bg-pink-700 transition-colors text-lg shadow-md">
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default Pregnancy 