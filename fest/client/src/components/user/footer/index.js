import React from 'react'

let year = new Date();
const current_year = year.getFullYear();

const Footer = function() {

    return(
        <div className="footer_container">
            <footer className="footer">
                <div className="col_sm_12 col_md_12 col_lg_6 footer_about">
                    About
                    <p className='fotter_about_paragraph'> 
                        lorem ipsum dolor sit amet, consectetur adipiscing
                        lorem ipsum dolor sit amet, consectetur adipiscing
                        lorem ipsum dolor sit amet, consectetur adipiscing
                        lorem ipsum dolor sit amet, consectetur adipiscing
                        lorem ipsum dolor sit amet, consectetur adipiscing
                        lorem ipsum dolor sit amet, consectetur adipiscing
                        
                    </p>
                </div>
                <div className="col_sm_6 col_md_6 col_lg_3 footer_categories">
                    Categories 
                    <a href="#">Registeration</a> 
                    <a href="#">Notice</a> 
                    <a href="#">Dashboard</a>  
                </div>
                <div className="col_sm_6 col_md_6 col_lg_3 footer_quicklinks">
                    Quick Links 
                    <a href="#">About Us</a> 
                    <a href="#">Contact Us</a> 
                    <a href="#">Login</a> 
                </div>
                <div className="col_sm_12 col_md_12 col_lg_12 footer_divider_line"></div>
                    <div className="footer_copyright_and_social">
                        <div className="col_sm_12 col_md_6 col_lg_6 footer_copyright">
                            &#169; {current_year} | All rigths reserved
                        </div>
                        <div className="col_sm_12 col_md_6 col_lg_6 footer_social">
                            <a href="#" className="footer_social_icon_facebook"></a>
                            <a href="#" className="footer_social_icon_instagram"></a>
                            <a href="#" className="footer_social_icon_twitter"></a>
                        </div>
                    </div>
            </footer>            
        </div>
    );
}


export default Footer