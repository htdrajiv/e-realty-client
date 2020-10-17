import React from 'react';

const LoadImage = (imageName, alt, style, classNames) => {
    return <img className={classNames} src={require(`./resources/img/${imageName}`)} style={style} alt={alt} />;
}

class ImageLoader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { name, style, alt, classNames } = this.props;
        return (
            LoadImage(name, alt, style, classNames)
        )
    }
}

export default ImageLoader;