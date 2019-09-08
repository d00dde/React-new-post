import React from 'react';
import { NewPostServiceConsumer} from '../new-post-service-context';

const withNewPostService = () => (Wrapped) => {
    return (props) => {
        return (
            <NewPostServiceConsumer>
                {
                    (newPostService) => {
                    return (<Wrapped {...props}
                                    newPostService={newPostService} />);
                    }
                }
            </NewPostServiceConsumer>
        );
    }
}

export default withNewPostService;