import * as assert from "node:assert";
import { describe, it } from "node:test";
import { example01 } from "../../src/compositions/trigger.js";

describe("trigger", () => {
  it("example01", () => {
    const block = example01();
    const expected = {
      type: "section",
      text: {
        text: "A message *with some bold text* and _some italicized text_.",
        type: "mrkdwn",
      },
      accessory: {
        type: "workflow_button",
        text: {
          type: "plain_text",
          text: "Run Workflow",
        },
        action_id: "workflowbutton123",
        workflow: {
          trigger: {
            url: "https://slack.com/shortcuts/Ft0123ABC456/xyz...zyx",
            customizable_input_parameters: [
              {
                name: "input_parameter_a",
                value: "Value for input param A",
              },
              {
                name: "input_parameter_b",
                value: "Value for input param B",
              },
            ],
          },
        },
      },
    };
    assert.deepStrictEqual(block, expected);
  });
});
