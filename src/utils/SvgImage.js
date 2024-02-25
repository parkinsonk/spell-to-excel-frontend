import React from 'react';
import SvgUri from 'react-native-svg';

const SvgImage = ({ source}) => {
    return (
        <SvgUri
        source={source}
        />
    );
    }

export default SvgImage;