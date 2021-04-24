import React,{useEffect} from 'react'


const Sponsor = function() {

    useEffect(()=>{ // Revel animation on scroll and when present on screen.
        
        const section = document.querySelector('.sponsors--box');
        const subSections = document.querySelectorAll('.sponsor');
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();

            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }

            if (isInViewport(section)){
                subSections.forEach((section) => {
                    section.classList.add('sponsor-visible');
                })
            }

        const revelSection = (entries,observer) => {
            const [entry] = entries;
                const sponsors = [...entry.target.children]
                if(entry.isIntersecting ){
                    sponsors.forEach(sponsor => {
                        sponsor.classList.add('sponsor-visible');
                    });
                    observer.unobserve(entry.target)
                }
        }

        const addAnimationEffect = () => {
            const sectionObserver = new IntersectionObserver(
                revelSection,{
                    root:null,
                    threshold:[0.1,1]
                }
            );
            
            sectionObserver.observe(section)
            
        }
        addAnimationEffect();

    },[]);


    return(
        <section className="sponsors-container">
            {/* <div className="bg-video">
                 <video className="bg-video__content" autoPlay loop muted >
                    <source src="../../../img/video-2.mp4" type="video/mp4" />
                        Your browser is not supported!
                </video>
            </div> */}
            <div className="heading--container">
                <h3 className="heading--3 section-heading">Sponsors</h3>
            </div>
            <div className="sponsors--box">
                <div className="sponsor">
                    <img src="../../../img/sponsor-lenskart.jpg" alt="Lenskart Logo" className="sponsor__img--1"/>
                </div>
                <div className="sponsor">
                    <img src="../../../img/sponsor-md.png" alt="Lacdonald Logo" className="sponsor__img--2" />
                </div>
                <div className="sponsor">
                    <img src="../../../img/sponsor-oppo.jpg" alt="Oppo Logo" className="sponsor__img--3" />
                </div>
                <div className="sponsor">
                    <img src="../../../img/sponsor-sting.jpeg" alt="Sting Logo" className="sponsor__img--4" /> 
                </div>
                <div className="sponsor">
                    <img src="../../../img/sponsor-union.png" alt="Union Bank Logo" className="sponsor__img--5" />
                </div>
                <div className="sponsor">
                    <img src="../../../img/sponsor-vh1.jpg" alt="VH1 Logo" className="sponsor__img--6"/>
                </div>
            </div>
        </section>

    );

}


export default Sponsor