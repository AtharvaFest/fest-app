import React from 'react'


const afterNavigation = WrappedComponent => {
    class AfterNavigation extends React.Component {

        state ={
            navFooterHeight:0
        }

        componentDidMount() {
            const navHeightElement = document.querySelector("#horizontal-navigation");
            const footerHeightElement = document.querySelector("#footer");
        
            this.setState({navFooterHeight:footerHeightElement.offsetHeight-navHeightElement.offsetHeight})
            
        }

        render(){
            return(
                <WrappedComponent  minMainContentHeight={{minHeight:`calc(100vh - ${this.state.navFooterHeight}px) !important`}}  {...this.props}/>
            )
        }

    }

    return AfterNavigation
}


export default afterNavigation