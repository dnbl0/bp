import { loadEnvConfig } from '@next/env'

const testSetup = async () => {
  const projectDir = process.cwd()
  loadEnvConfig(projectDir)
};

export default testSetup;
