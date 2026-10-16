/**
 * @typedef {import("@slack/oauth").Installation} Installation
 * @typedef {import("@slack/bolt").Context} Context
 */

export class AcmeAccounts {
  /**
   * @param {Required<import("@slack/oauth").InstallationStore>} installationStore
   */
  constructor(installationStore) {
    this.installationStore = installationStore;
  }

  /**
   * @param {Context} context
   * @param {string} userId
   * @returns {Promise<Installation | undefined>}
   */
  async find(context, userId) {
    const installation = await this.installationStore
      .fetchInstallation({
        enterpriseId: context.enterpriseId,
        teamId: context.teamId,
        userId,
        isEnterpriseInstall: context.isEnterpriseInstall,
      })
      .catch(() => undefined);
    if (installation?.user.id !== userId || !installation.user.token) {
      return undefined;
    }
    return installation;
  }

  /**
   * @param {Context} context
   * @param {string} userId
   * @returns {Promise<string | undefined>}
   */
  async forget(context, userId) {
    const account = await this.find(context, userId);
    if (account === undefined) {
      return undefined;
    }
    await this.installationStore.deleteInstallation({
      enterpriseId: account.enterprise?.id,
      teamId: account.team?.id,
      userId,
      isEnterpriseInstall: account.isEnterpriseInstall ?? false,
    });
    return account.user.token;
  }
}
