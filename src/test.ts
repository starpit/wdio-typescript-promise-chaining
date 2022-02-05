import electron from 'electron'
import { Application } from 'spectron'
import { strictEqual } from 'assert'

const app = new Application({
  path: electron.toString(),
  args: ['.']
})

async function beforeAll() {
  await app.start()
}

function afterAll() {
  app.stop()
}

describe('test 1', function() {
  this.timeout(10000)
  before(beforeAll)
  after(afterAll)

  it('should getText with promise.then', async () => {
    await app.client.$('h1')
      .then(_ => _.waitForExist())

    const text = await app.client.$('h1')
      .then(_ => _.getText())
    strictEqual(text, 'Hello World!')
  })
})

describe('test 2', function() {
  this.timeout(10000)
  before(beforeAll)
  after(afterAll)

  it('should getText with await', async () => {
    const h1 = await app.client.$('h1')
    await h1.waitForExist()

    const text = await h1.getText()
    strictEqual(text, 'Hello World!')
  })
})
