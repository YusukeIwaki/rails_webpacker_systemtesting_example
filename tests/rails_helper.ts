const railsBeginTransaction = async () => {

}

const railsRollbackTransaction = async () => {

}

const railsFactoryBotCreate = async (factory: string, attributes: Record<string, unknown>) => {
  return { name: 'test' }
}

export { railsBeginTransaction, railsFactoryBotCreate, railsRollbackTransaction }
