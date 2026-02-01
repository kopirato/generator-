async function fileToBase64(file) {
  return new Promise((resolve) => {
    if (!file) return resolve(null);

    let reader = new FileReader();

    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}


// ============================

async function generatePPT() {

  let pptx = new PptxGenJS();

  // Brand
  const BLUE = "0B3C6D";
  const ORANGE = "FF7A00";


  // Uploads
  const logoFile = document.getElementById("logoUpload").files[0];
  const heroFile = document.getElementById("heroUpload").files[0];
  const siteFile = document.getElementById("siteUpload").files[0];

  const logoImg = await fileToBase64(logoFile);
  const heroImg = await fileToBase64(heroFile);
  const siteImg = await fileToBase64(siteFile);


  // Layout
  pptx.defineLayout({
    name: "NENKAI",
    width: 13.3,
    height: 7.5
  });

  pptx.layout = "NENKAI";


  // ============================
  // Helper Slide
  // ============================

  function addSlide(title, points, image) {

    let slide = pptx.addSlide();

    slide.background = { fill: "F6F9FC" };


    // Header
    slide.addShape(pptx.ShapeType.rect, {
      x: 0, y: 0, w: 13.3, h: 0.25,
      fill: { color: ORANGE }
    });


    // Logo
    if (logoImg) {
      slide.addImage({
        data: logoImg,
        x: 12.2, y: 0.3, w: 0.8
      });
    }


    // Title
    slide.addText(title, {
      x: 0.5, y: 0.6, w: 8,
      fontSize: 30,
      bold: true,
      color: BLUE
    });


    // Points
    let y = 1.4;

    points.forEach(p => {

      slide.addText("• " + p, {
        x: 0.6, y: y, w: 7,
        fontSize: 18,
        color: "222222"
      });

      y += 0.45;
    });


    // Image
    if (image) {
      slide.addImage({
        data: image,
        x: 8.8, y: 1.3,
        w: 4, h: 3
      });
    }


    // Footer
    slide.addText("Selelo Business Park Ltd © 2026", {
      x: 0, y: 7.1, w: 13.3,
      fontSize: 10,
      align: "center",
      color: "888888"
    });

  }


  // ============================
  // TITLE SLIDE
  // ============================

  let title = pptx.addSlide();

  title.background = { fill: "FFFFFF" };


  if (heroImg) {
    title.addImage({
      data: heroImg,
      x: 6.5, y: 0,
      w: 6.8, h: 7.5
    });
  }


  title.addText("Nenkai’s Shopping Arcade", {
    x: 0.7, y: 1.8,
    fontSize: 42,
    bold: true,
    color: BLUE
  });


  title.addText("Groundbreaking & Dedication Ceremony", {
    x: 0.7, y: 2.7,
    fontSize: 22
  });


  title.addText("A Development by Selelo Business Park Ltd", {
    x: 0.7, y: 3.2,
    fontSize: 18
  });


  title.addText("The Future of Kitengela Commerce Begins Here!", {
    x: 0.7, y: 3.8,
    fontSize: 20,
    bold: true
  });


  title.addText("Monday, 2nd February 2026 | Project Site, Acacia, Kitengela", {
    x: 0.7, y: 4.4,
    fontSize: 14
  });


  if (logoImg) {
    title.addImage({
      data: logoImg,
      x: 0.7, y: 0.5, w: 1
    });
  }



  // ============================
  // CONTENT SLIDES
  // ============================


  addSlide("Warm Welcome", [
    "You are cordially invited to witness history",
    "Join community partners, stakeholders & well-wishers",
    "Your presence lays the first brick in our shared foundation",
    "Let’s build this vision together"
  ], siteImg);


  addSlide("Nenkai’s Arcade – Key Facts", [
    "Location: Acacia, Kitengela, Along Namanga Road, Kajiado County",
    "Size: 4,350 sqm – Approximately 150 modern shops",
    "Type: Mini Mall / Shopping Arcade",
    "Retail | Food & Beverage | Services | Offices",
    "Estimated Investment: USD $1,500,000"
  ], siteImg);


  addSlide("Kitengela – Kenya’s Fastest-Growing Commercial Hub", [
    "Rapid population & urban expansion south of Nairobi",
    "Strategic along Namanga Road with improving infrastructure",
    "Rising demand for retail, F&B, offices & services",
    "Multiple new developments fueling growth",
    "High ROI potential"
  ], siteImg);


  addSlide("Modern Design for Maximum Opportunity", [
    "Ground Floor: Retail, F&B, Showrooms, Parking",
    "First Floor: Shops, F&B, Offices",
    "High foot traffic design",
    "Tenant success focus"
  ], siteImg);


  addSlide("Ceremony Schedule", [
    "Date: Monday, 2nd February 2026",
    "Time: 8:00 AM Sharp",
    "Morning refreshments",
    "Venue: Acacia, Kitengela",
    "Comfortable footwear recommended"
  ], siteImg);


  addSlide("What to Expect", [
    "Blessing & Official Unveiling",
    "Keynote Address",
    "Symbolic Groundbreaking",
    "Networking & Breakfast",
    "Celebrate Progress"
  ], siteImg);


  addSlide("Building More Than a Mall", [
    "Vibrant commercial hub",
    "Job creation",
    "Entrepreneurial spaces",
    "Community growth",
    "Future-focused development"
  ], siteImg);


  addSlide("Confirm Your Presence", [
    "RSVP by: 30th January 2026",
    "0721 235 005 | 0713 904 835",
    "events@nenkai-arcade.com",
    "Joshua.Tapatayia@gmail.com",
    "www.nenkai-arcade.com/groundbreaking"
  ], siteImg);


  addSlide("See You on 2nd February 2026!", [
    "Thank you for supporting Nenkai’s Arcade",
    "Let’s turn vision into reality",
    "Together we build",
    "Selelo Business Park Ltd",
    "The Future of Kitengela Commerce Begins Here!"
  ], heroImg);



  // ============================
  // EXPORT
  // ============================

  pptx.writeFile("Nenkai_Groundbreaking_2026.pptx");

}
