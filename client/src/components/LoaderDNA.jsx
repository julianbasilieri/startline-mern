import { DNA } from 'react-loader-spinner';

const LoaderDNA = () => {
    return (
        <div className="loader-container">
            <DNA
                color="#000000"
                height={200}
                width={200}
            />
        </div>
    );
}

export default LoaderDNA