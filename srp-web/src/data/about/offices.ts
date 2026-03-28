export type BranchOffice = {
  name: string;
  location: string;
  mapUrl: string;
  image: string;
  text: string;
};

export const aboutBranchOffices: BranchOffice[] = [
  {
    name: "Tajikistan Office",
    location: "Khujand, Tajikistan",
    mapUrl: "https://maps.app.goo.gl/Zo1Wng39suXYzAve6",
    image: "/icons_about/branch/tajikistan-group.webp",
    text: "Our Khujand office provides software development and IT consulting services to clients across the world. The team speaks English, which helps us work effectively with international companies operating in english speaking countries. We handle the full project cycle from requirements gathering to deployment and support. Our location in Northern Tajikistan gives us good access to the broader Central Asian market while maintaining lower operational costs than offices in major capitals.",
  },
  {
    name: "Uzbekistan Office",
    location: "Ferghana, Uzbekistan",
    mapUrl:
      "https://www.google.com/maps/place/40%C2%B021'55.5%22N+71%C2%B046'27.4%22E/@40.365405,71.7736443,299m/data=!3m2!1e3!4b1!4m4!3m3!8m2!3d40.365404!4d71.774288?authuser=0&entry=ttu&g_ep=EgoyMDI2MDEyMC4wIKXMDSoASAFQAw%3D%3D",
    image: "/icons_about/branch/ferghana_group.JPG",
    text: "Our Ferghana office serves as a strategic hub for our operations in Uzbekistan, fostering local talent and delivering innovative software solutions to our global clientele.",
  },
];
