import React from "react";

import Nav from "../nav";

import mypdfImg from "./mypdf.jpg";

// import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

// const createPDF = async (name) => {
//     const existingPdfBytes = await fetch("./mypdf.pdf").then((res) =>
//       res.arrayBuffer()
//     );

    // const pdfDoc = await PDFDocument.load(existingPdfBytes);
  //   pdfDoc.registerFontkit(fontkit);

  //   //get font
  //   const fontBytes = await fetch("./myfont.ttf").then((res) =>
  //     res.arrayBuffer()
  //   );

  // const canvas = document.createElement("canvas");
  // const ctx = canvas.getContext("2d");
  
  // canvas.width = mypdfImg.width;
  // canvas.height = mypdfImg.height;
  
  // ctx.drawImage(mypdfImg, 0, 0);
  // const urii = await canvas.toDataURL("image/jpeg");

  // const uri = await pdfDoc.saveAsBase64({ dataUri: true });

  // document.querySelector("mypdf").src = uri;
  //   // Embed our custom font in the document
  //   const SanChezFont = await pdfDoc.embedFont(fontBytes);

  //   // Get the first page of the document
  //   const pages = pdfDoc.getPages();
  //   const firstPage = pages[0];

  //   // Draw a string of text diagonally across the first page
  //   firstPage.drawText(name, {
  //     x: 300,
  //     y: 270,
  //     size: 58,
  //     font: SanChezFont,
  //     color: rgb(217, 148, 104),
  //   });
// };

const Profile = function () {
  return (
    <div>
      <Nav />
      <div className="after-navigation">
        <section className="profile__section">
          <div className="profile__student-details">
            <h4 className="heading--4 details__heading">Details</h4>
            <div className="profile__student-details--content">
              <table className="details__table">
                <tbody>
                  <tr>
                    <td>Name:-</td>
                    <td>Pradeep Ingle</td>
                  </tr>
                  <tr>
                    <td>Username:-</td>
                    <td>prad</td>
                  </tr>
                  <tr>
                    <td>Email:-</td>
                    <td>inglepradeep00@gmail.com</td>
                  </tr>
                  <tr>
                    <td>Mobile Number:-</td>
                    <td>1234567890</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
      <button >button</button>
      {/* <iframe
        title="pdf"
        style={{ width: "500px", height: "500px" }}
        id="mypdf"
      ></iframe> */}
      <div style={{ width: "500px", height: "500px" }}>
        <img id="mypdf"/>
      </div>
    </div>
  );
};

export default Profile;
