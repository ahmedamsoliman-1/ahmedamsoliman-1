import Navbar from "./components/Navbar";
import Card from "./components/Card";
import "./App.css";

const objs = [
  {
    title: "Personal Website",
    link: "https://ahmedamsoliman.herokuapp.com/",
    image: "../img/site_cir.jpg",
  },
  {
    title: "Web Resume",
    link: "https://resume.ahmedalimsoliman.click/",
    image: "../img/web_cir.jpg",
  },
  {
    title: "GitHub",
    link: "https://github.com/ahmedamsoliman-1",
    image: "../img/github.png",
  },
  {
    title: "GitLab",
    link: "https://gitlab.com/ahmedamsoliman-1",
    image: "../img/gitlab.png",
  },
  {
    title: "Linkedin",
    link: "https://www.linkedin.com/in/ahmedalimsoliman/",
    image: "../img/linkedin_2.png",
  },
  {
    title: "Facebook",
    link: "https://www.facebook.com/ahmedalimsoliman",
    image: "../img/facebook.png",
  },
  {
    title: "Instagram",
    link: "https://www.instagram.com/ahmed_ali_m_soliman/",
    image: "../img/Instagram_icon.png.png",
  },
  {
    title: "Twitter",
    link: "https://twitter.com/ahmedamsoliman",
    image: "../img/twitter.png",
  },
  {
    title: "Discord",
    link: "https://discord.com/ahmedalimohsoliman-1#9220",
    image: "../img/discord.svg",
  },
  {
    title: "Message Me",
    link: "https://api.whatsapp.com/send?phone=971507065214",
    image: "../img/whatsapp.png",
  },
  {
    title: "Credly",
    link: "https://www.credly.com/users/ahmed-ali-mohamed-soliman/badges",
    image: "../img/credly.svg",
  },
  {
    title: "Skill Soft",
    link: "https://skillsoft.digitalbadges.skillsoft.com/profile/ahmedsoliman614032/wallet",
    image: "../img/soft.jpeg",
  },
  {
    title: "Printable CV",
    link: "https://cv.ahmedalimsoliman.click/",
    image: "../img/cv.png",
  },
  {
    title: "FLuid Gallery",
    link: "https://fluid.ahmedalimsoliman.click/",
    image: "../img/gallery.jpg",
  },
  {
    title: "Uploader",
    link: "https://upload.ahmedalimsoliman.click/",
    image: "../img/upload.png",
  },
  {
    title: "Badges and Certifications",
    link: "https://ahmedamsoliman.herokuapp.com/badges",
    image: "../img/badges.png",
  },
];

function App() {
  return (
    <>
      <Navbar />
      <div className="container text-center mt-5">
        <h1>Linktree</h1>
        <div className="row">
          {objs.map((obj, index) => (
            <Card
              key={index}
              src={obj["image"]}
              link={obj["link"]}
              title={obj["title"]}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
