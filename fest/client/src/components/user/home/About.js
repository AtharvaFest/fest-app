import React,{useEffect} from 'react'



const About = function() {
    

    useEffect(()=>{ // REVEL ANIMATION ON VIEW PORT
        
        const sections = document.querySelectorAll('.photo-container');
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();

            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }

        sections.forEach((section)=>{
            if (isInViewport(section)){
                if(section.dataset.eventName === "rhythm"){
                    section.classList.add('rhythm-photo');
                }
                if(section.dataset.eventName === "ieee"){
                    section.classList.add('ieee-photo')
                }
            }
        });

        const revelSection = (entries,observer) => {
            const [entry] = entries;

            if(entry.target.dataset.eventName === "rhythm"){
                if(entry.isIntersecting || entry.isVisible){
                    entry.target.classList.add('rhythm-photo');
                    observer.unobserve(entry.target)
                }
            }

            if(entry.target.dataset.eventName === "ieee"){
                if(entry.isIntersecting || entry.isVisible){
                    entry.target.classList.add('ieee-photo')
                    observer.unobserve(entry.target)
                }
            }

        }

        const addAnimationEffect = () => {
            const sectionObserver = new IntersectionObserver(
                revelSection,{
                    root:null,
                    threshold:[0.15,0.2,0.4,0.5,1]
                }
            );
            
            sections.forEach((section) => {
                sectionObserver.observe(section)
            })
            
        }

        addAnimationEffect();

    },[]);



    return(
        <section className="about">
            <div className="heading--container">
                <h3 className="heading--3 section-heading">About</h3>
            </div>
            <div className="about__rhythm">
                <div className="photo-container" data-event-name="rhythm">
                    <img src="../../../img/head--2.jpg" alt="Rhythm" className="photo" />
                </div>
                <div className="rhythm__content">
                    <p className="paragraph ">
                        RHYTHM – where the culture blends with Technology since 1999. Shri.
                        Sunil Rane, Executive President, Atharva Group of Institutes believes
                        in the all round development of every student to be the competent
                        citizen of the nation to serve the society.
                    </p>
                    <p className="paragraph">
                        We have started the cultural festival called RHYTHM where students
                        showcase their talents in multiple cultural events, technical fests,
                        celebrity performances and competitions make them confident and job
                        ready. RHYTHM is the amazing festival which entertains and plays a
                        significant role in shaping the career of students.
                    </p>
                </div>
            </div>

            <div className="about__ieee">
                <div className="ieee_content">
                    <p className="paragraph">  
                        IEEE TECHITHON 2019, this time focuses on filling in the gap that
                        separates existing technology with new, modern users with their theme
                        INNOVAZIA, Revamping tech.
                    </p>
                    <p className="paragraph">
                        The fest is more promising than ever assuring a radiant
                        blend of technology, Creativity, Treasurehunt,
                        Hogathon, Neon football, escape the room , PUBG ,Laser tag and many
                        more, IEEE TECHITHON is anticipated to set a new high for all the
                        technical fests in the city.
                    </p>
                </div>
                <div className="photo-container" data-event-name="ieee">
                    <img src="../../../img/head--3.jpg" alt="IEEE" className="photo"/>
                </div>
            </div>
        </section>
    );

}


export default About