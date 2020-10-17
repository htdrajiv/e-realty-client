import React from 'react';

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="footer fixed-bottom bg-dark">
                    <span> Copyright </span>
                </div>
            </div>
        )
    }
}

export default Footer;