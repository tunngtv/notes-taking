import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { components } from '../../react-markdown-components';
// import './preview.module.scss';
import styles from './preview.module.scss';

// Define the type for the document prop
interface PreviewProps {
    document: string;
}

const Preview: React.FC<PreviewProps> = ({ document }) => {
    return (
        <div className={styles.preview}>
            <ReactMarkdown
                components={components}
                remarkPlugins={[remarkGfm]}
            >
                {document || ''}
            </ReactMarkdown>
        </div>
    );
};

export default Preview;
