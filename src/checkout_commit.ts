import promisify from 'util.promisify';
import childProcess from 'child_process';
import {validatePath, resolveHome} from './util';

const execFile = promisify(childProcess.execFile);

/**
 * Checks out a commit given its repo and hash.
 *
 * Returns void. Throws error on failure.
 */
const checkoutCommit = async (pathToRepo, hash, options = {force: false}) => {
  const resolvedPath = resolveHome(pathToRepo);

  try {
    validatePath(resolvedPath);
  } catch (e) {
    return Promise.reject(e);
  }
  const args = ['checkout',hash];

  if(options.force) args.push('--force');

  return execFile("git",args, {
    cwd: resolvedPath
  });
};

export default checkoutCommit;
