import assert from 'assert'
import { ConverseTesting, bot } from 'newbot/testing'
import mainSkill from './main'

describe('Main Skill Test', () => {
    let userConverse, converse

    beforeEach(() => {
        converse = new ConverseTesting(mainSkill)
        userConverse = converse.createUser({
            session: {
                message: {
                    source: 'website'
                }
            }
        })
    })

    it('Start Conversation', () => {
        return userConverse
            .start(testing => {
                const { actions } = testing.output(0)
                assert.deepEqual(actions, ['play'])
            })
            .end()
    })
})