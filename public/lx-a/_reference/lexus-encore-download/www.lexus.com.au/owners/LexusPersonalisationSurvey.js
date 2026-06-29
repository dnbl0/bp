function prepareTemplateWKLBC(TemplateService) {
    function registerTemplate(source) {
        return TemplateService.registerTemplate(Object.assign({}, source, {
            name: 'Lexus Personalisation Survey',


        }));
    }


    try {
        (function() {

            function buildBindId(context) {
                return `${context.campaign}:${context.experience}`;
            }

            function apply(context, template) {
                return LexusPersonalisation.waitForEventConsumer(context.componentKey)
                    .then(() => {
                        SalesforceInteractions.DisplayUtils.bind(buildBindId(context));

                        let payload = {
                            "type": "survey",
                            "survey": context.survey,
                            "componentKey": context.componentKey,
                            "contentZone": context.contentZone,
                            "campaign": context.campaign,
                            "experience": context.experience,
                            "userGroup": context.userGroup
                        };

                        typeof LexusPersonalisation !== "undefined" && LexusPersonalisation.pushPayload(context.componentKey, payload) ||
                            console.error("LexusPersonalisation was not loaded and executed properly!");

                        // used to debug
                        console.info(`MCP campaign apply event dispatched for ${context.contentZone} - ${buildBindId(context)}`);
                    });
            }

            function reset(context, template) {
                return LexusPersonalisation.waitForEventConsumer(context.componentKey || context.contentZone)
                    .then(() => {
                        SalesforceInteractions.DisplayUtils.bind(buildBindId(context));

                        let payload = {
                            "type": "reset",
                            "componentKey": context.componentKey || context.contentZone,
                            "contentZone": context.contentZone,
                            "campaign": context.campaign,
                            "experience": context.experience,
                            "userGroup": context.userGroup
                        }

                        typeof LexusPersonalisation !== "undefined" && LexusPersonalisation.pushPayload(context.componentKey, payload) ||
                            console.error("LexusPersonalisation was not loaded and executed properly!");

                        console.info(`MCP campaign reset event dispatched for ${context.userGroup} - ${buildBindId(context)}`);
                    });
            }

            // Executes if user is in CONTROL group (not possible via. configuration for quiz) but will put it here for a fallback
            function control(context) {
                return LexusPersonalisation.waitForEventConsumer(context.componentKey || context.contentZone)
                    .then(() => {
                        SalesforceInteractions.DisplayUtils.bind(buildBindId(context));

                        let payload = {
                            "type": "control",
                            "componentKey": context.componentKey || context.contentZone,
                            "contentZone": context.contentZone,
                            "campaign": context.campaign,
                            "experience": context.experience,
                            "userGroup": context.userGroup
                        }

                        typeof LexusPersonalisation !== "undefined" && LexusPersonalisation.pushPayload(context.componentKey, payload) ||
                            console.error("LexusPersonalisation was not loaded and executed properly!");

                        // used to debug
                        console.info(`MCP campaign control event dispatched for ${context.userGroup} - ${buildBindId(context)}`);
                    });
            }

            registerTemplate({
                apply: apply,
                reset: reset,
                control: control
            });

        })();


    } catch (e) {
        if (window.Evergage && Evergage.log) {
            Evergage.log.error(e);
        }
    }

    //# sourceURL=LexusPersonalisationSurvey.js
}