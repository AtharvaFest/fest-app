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
            <div className="heading--container">
                <h3 className="heading--3 section-heading sponser-header">Sponsors</h3>
            </div>
            <div className="sponsors--box">
                <div className="sponsor">
                    <img src="../../../img/sponsor-lenskart.webp" alt="Lenskart Logo" className="sponsor__img--1"/>
                </div>
                <div className="sponsor">
                    <img src="../../../img/sponsor-md.webp" alt="Lacdonald Logo" className="sponsor__img--2" />
                </div>
                <div className="sponsor">
                    <img src="../../../img/sponsor-oppo.webp" alt="Oppo Logo" className="sponsor__img--3" />
                </div>
                <div className="sponsor">
                    <img src="../../../img/sponsor-sting.webp" alt="Sting Logo" className="sponsor__img--4" /> 
                </div>
                <div className="sponsor">
                    <img src="../../../img/sponsor-union.webp" alt="Union Bank Logo" className="sponsor__img--5" />
                </div>
                <div className="sponsor">
                    <img src="../../../img/sponsor-vh1.webp" alt="VH1 Logo" className="sponsor__img--6"/>
                </div>
            </div>
        </section>

    );

}


export default Sponsor