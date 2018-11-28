import assert from 'assert'
import {
    ConverseTesting
} from 'newbot/testing'
import quiz from './quiz'

describe('Quiz Skill Test', () => {
    let userConverse, converse

    beforeEach(() => {
        converse = new ConverseTesting(quiz)
        userConverse = converse.createUser({
            session: {
                message: {
                    source: 'website'
                }
            }
        })
    })

    it('Test Quiz', () => {
        return userConverse
            .prompt('play', testing => {
                const { actions, text } = testing.output(0)
                assert.equal(text, 'What is the capital of France?')
                assert.deepEqual(actions, ['Paris', 'Lyon', 'Marseille'])
            })
            .prompt('Paris', testing => {
                const text = testing.output(0)
                const score = testing.userVariable('score')
                assert.equal(text, 'Very good answer')
                assert.equal(score, 1)
            })
            .prompt('Saturn', testing => {
                const text = testing.output(0)
                const randomText = ['It\'s wrong', 'Wrong answer'].indexOf(text)
                const score = testing.userVariable('score')
                assert.notEqual(randomText, -1)
                assert.equal(score, 1)
            })
            .prompt('Google', testing => {
                const score = testing.userVariable('score')
                assert.equal(score, 2)
            })
            .end()
    })

})