// libs
import Bus from 'src/Infrastructure/Bus';

export default class Nadia {

// commands (async - return via optional callback when done)
    static command = {
        

        ruleDescriptionUpdate: (oldRuleName, ruleName, ruleCategory)=>{
            Bus.command('rule/updateRule', {oldRuleName:oldRuleName, newRuleName: ruleName, newRuleCategory: ruleCategory}).done((res)=>{
                if(res.newRuleName = ruleName && res.newCategory == ruleCategory)//success case of redirect
                {
                //   Bus.publish('Toast', {
                //     status: 'info',
                //     text: 'The rule has been successfully created.'
                //   });
                }
            })
        },

        createNewRule:(ruleName, ruleCategory)=>{
            Bus.command('rule/createNewRule',{name: ruleName, category: ruleCategory}).done((res)=>{
                if(res.ruleName = ruleName && res.category == ruleCategory)//success case of redirect
                {
                //   Bus.publish('Toast', {
                //     status: 'info',
                //     text: 'The rule has been successfully created.'
                //   });
                }
            })
        },

        saveRuleText:(ruleName, ruleText)=>{
            Bus.command('rule/createFile',{ruleName:ruleName, ruleText:ruleText}).done((res)=>{
                if(res.ruleText == ruleText)
                {
                    // Bus.publish('Toast', {
                    //     status: 'info',
                    //     text: 'The rule text has been successfully updated.'
                    //   });          
                }
            })
        },

        feedAnswer:(question, answer, callback)=>{
            Bus.command('inference/feedAnswer',{question: question, answer: answer}).done((res)=>{
                // Bus.publish('Toast', {
                //     status: 'info',
                //     text: 'The question has been successfully answered.'
                //   });
                callback(res);
            })
        },

        editAnswer:(question, callback)=>{
            Bus.command('inference/editAnswer', {question:question}).done((res)=>{
                
                callback(res);
            })
        },

        updateHistory:(ruleName, callback)=>{
            Bus.command('rule/updateHistory', {ruleName: ruleName, ruleText: ''}).done((res)=>{
                if(res.update == 'done'){
                    // Bus.publish('Toast', {
                    //     status: 'info',
                    //     text: 'The result has been successfully saved.'
                    //   });
                    callback(res); 
                }
            });
        },
    }

    // query (async - return via callback)
    static query = {
        findARuleFromFile: (callback)=>{
            Bus.query('rule/findARuleFromFile').done((res) => {
                callback(res);
            });  
        },

        getAllRules: (callback) =>{
            Bus.query('rule/findAllRules').done((res) => {
                callback(res);
            });            
        },

        findRuleTextByName: (ruleName, callback)=>{
            Bus.query('rule/findRuleTextByName/',{ruleName:ruleName}).done((res)=>{
                callback(res);
            });
        },

        searchRuleByName: (ruleName, callback)=>{
            Bus.query('rule/searchRuleByName/',{ruleName:ruleName}).done((res)=>{
                callback(res);
            });
        },

        setNadia:(ruleName, callback)=>{
            Bus.query('inference/setInferenceEngine',{ruleName: ruleName}).done((res)=>{
                if(res.InferenceEngine == 'created'){
                    // Bus.publish('Toast', {
                    //     status: 'info',
                    //     text: 'Nadia has been successfully set.'
                    //   });
                      callback(res);
                }  
            })
        },

        setNadiaFromFile:(callback)=>{
            Bus.query('inference/setInferenceEngineFromFile').done((res)=>{
                if(res.InferenceEngine == 'created'){
                    // Bus.publish('Toast', {
                    //     status: 'info',
                    //     text: 'Nadia has been successfully set.'
                    //   });
                    callback(res);
                }  
            })
        },

        setNadiaForMachineLearning:(ruleName, callback)=>{
            Bus.query('inference/setMachineLearningInferenceEngine',{ruleName: ruleName}).done((res)=>{
                if(res.InferenceEngine == 'created'){
                    // Bus.publish('Toast', {
                    //     status: 'info',
                    //     text: 'Nadia has been ready for Machine Learning!'
                    //   });
                      callback(res);
                }  
            })
        },

        getNextQuestion: (ruleName, callback)=>{
            Bus.query('inference/getNextQuestion',{ruleName: ruleName}).done((res)=>{
                callback(res);
            })
        },

        getNextQuestionFromFile:(callback)=>{
            Bus.query('inference/getNextQuestionFromFile').done((res)=>{
                callback(res);
            })
        },

        viewSummary: (callback)=>{
            Bus.query('inference/viewSummary').done((res)=>{
                callback(res);
            })
        },


        
    }
}