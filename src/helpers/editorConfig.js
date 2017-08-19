import slate from 'ory-editor-plugins-slate';
import parallax from 'ory-editor-plugins-parallax-background';
import spacer from 'ory-editor-plugins-spacer';
import video from 'ory-editor-plugins-video';
import image from 'ory-editor-plugins-image';
import divider from 'ory-editor-plugins-divider';
import 'ory-editor-core/lib/index.css';
import 'ory-editor-ui/lib/index.css';
import 'ory-editor-plugins-slate/lib/index.css';
import 'ory-editor-plugins-parallax-background/lib/index.css';
import 'ory-editor-plugins-spacer/lib/index.css';
import 'ory-editor-plugins-video/lib/index.css';
import 'ory-editor-plugins-image/lib/index.css';
import header from '../components/oryHeaderPlugin';

export const contentPlugins = [slate(), divider, image, video, spacer, header];

export const layoutPlugins = [parallax({ defaultPlugin: slate() })];
