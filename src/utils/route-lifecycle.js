import React from 'react';

class RouteLifecycle extends React.Component {
    componentWillMount() {
        const { component, onEnter, ...props } = this.props;
        onEnter(props.params);
    }

    componentWillUnmount() {

    }

    render() {
        const { component, onEnter, ...props } = this.props;
        const Component = component;
        return <Component {...props} />;
    }
}

export default function lifecycle(component, onEnter) {
    return (props) => <RouteLifecycle {...props} component={component} onEnter={onEnter} />;
}
