import chalk from 'chalk';

const isDev = process.env.NODE_ENV === 'development';

export function logInfo(message: string) {
  if (!isDev) return;
  console.log(chalk.blue.bold('[INFO]'), message);
}

export function logSuccess(message: string) {
  if (!isDev) return;
  console.log(chalk.green.bold('[SUCCESS]'), message);
}

export function logWarning(message: string) {
  if (!isDev) return;
  console.log(chalk.yellow.bold('[WARNING]'), message);
}

export function logError(message: string) {
  if (!isDev) return;
  console.log(chalk.red.bold('[ERROR]'), message);
}
