import { manifest } from '@qwik-client-manifest';
import {
  renderToStream,
  type RenderToStreamOptions,
} from '@builder.io/qwik-city/server';
import Root from './root';

const basePath = '/Myfolio/qwik/';

export default function (opts: RenderToStreamOptions) {
  return renderToStream(<Root />, {
    manifest,
    basePathname: basePath,
    ...opts,
  });
}
