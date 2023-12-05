document.addEventListener('DOMContentLoaded', function () {
  const profilesContainer = document.getElementById('data-container');

  fetch('https://shopkart-backend-6w0s.onrender.com/api/data')
    .then(response => response.json())
    .then(data => {
      data.forEach(user => {
        const profile = createProfile(user);
        profilesContainer.appendChild(profile);
        profile.addEventListener('click', () => {
          validateUser(user);
        });

      });
    })
    .catch(error => {
      console.error('Error:', error);
    });

  function createProfile(user) {
    const profile = document.createElement('div');
    profile.className = 'profile';

    const avatar = document.createElement('img');
    avatar.className = 'avatar';
    const userImages = [
      './images/user-1.png',
      './images/user-2.png',
      './images/user-3.png'
    ];
    const randomIndex = Math.floor(Math.random() * userImages.length);
    const selectedImage = userImages[randomIndex];
    avatar.src = selectedImage;
    avatar.alt = 'Avatar';
    profile.appendChild(avatar);

    const hr = document.createElement('hr');
    profile.appendChild(hr);

    const details = document.createElement('div');
    details.className = 'details';

    const userFields = [
      { label: 'User Id :', value: user.id },
      { label: 'User Name :', value: `${user.first_name} ${user.last_name}` },
      { label: 'Gender :', value: user.gender },
      { label: 'Age :', value: calculateAge(user.date_of_birth) }
    ];

    userFields.forEach(field => {
      const detail = document.createElement('div');
      detail.className = 'detail';

      const label = document.createElement('h3');
      label.className = 'user';
      label.textContent = field.label;

      const value = document.createElement('p');
      value.className = 'userp';
      value.textContent = field.value;

      detail.appendChild(label);
      detail.appendChild(value);
      details.appendChild(detail);
    });

    profile.appendChild(details);

    return profile;
  }

  function calculateAge(dateOfBirth) {
    const parts = dateOfBirth.split('/');
    const year = parseInt(parts[2]);
    if (year < 23 && year > 0)
      return 23 - year;
    const age = 123 - year;
    if (age > 0)
      return age;
  }

  function validateUser(user) {
    if (isValidUser(user)) {
      const queryParams = new URLSearchParams({
        id: user.id,
        uid: user.uid,
        first_name: user.first_name,
        last_name: user.last_name,
        gender: user.gender,
        date_of_birth: user.date_of_birth
      });

      window.location.href = `/home.html?${queryParams}`;
    } else {
      alert('User validation failed.');
    }
  }
  function isValidUser(user) {
    const age = calculateAge(user.date_of_birth);
    return age >= 18;
  }
});
