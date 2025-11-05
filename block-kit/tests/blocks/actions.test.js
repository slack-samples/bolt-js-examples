import * as assert from "node:assert";
import { describe, it } from "node:test";
import { example01, example02 } from "../../src/blocks/actions.js";

describe("actions", () => {
  it("example01", () => {
    const block = example01();
    const expected = {
      type: "actions",
      block_id: "actions1",
      elements: [
        {
          type: "static_select",
          placeholder: {
            type: "plain_text",
            text: "Which witch is the witchiest witch?",
          },
          action_id: "select_2",
          options: [
            {
              text: {
                type: "plain_text",
                text: "Matilda",
              },
              value: "matilda",
            },
            {
              text: {
                type: "plain_text",
                text: "Glinda",
              },
              value: "glinda",
            },
            {
              text: {
                type: "plain_text",
                text: "Granny Weatherwax",
              },
              value: "grannyWeatherwax",
            },
            {
              text: {
                type: "plain_text",
                text: "Hermione",
              },
              value: "hermione",
            },
          ],
        },
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "Cancel",
          },
          value: "cancel",
          action_id: "button_1",
        },
      ],
    };
    assert.deepStrictEqual(block, expected);
  });

  it("example02", () => {
    const block = example02();
    const expected = {
      type: "actions",
      block_id: "actionblock789",
      elements: [
        {
          type: "datepicker",
          action_id: "datepicker123",
          initial_date: "1990-04-28",
          placeholder: {
            type: "plain_text",
            text: "Select a date",
          },
        },
        {
          type: "overflow",
          options: [
            {
              text: {
                type: "plain_text",
                text: "*this is plain_text text*",
              },
              value: "value-0",
            },
            {
              text: {
                type: "plain_text",
                text: "*this is plain_text text*",
              },
              value: "value-1",
            },
            {
              text: {
                type: "plain_text",
                text: "*this is plain_text text*",
              },
              value: "value-2",
            },
            {
              text: {
                type: "plain_text",
                text: "*this is plain_text text*",
              },
              value: "value-3",
            },
            {
              text: {
                type: "plain_text",
                text: "*this is plain_text text*",
              },
              value: "value-4",
            },
          ],
          action_id: "overflow",
        },
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "Click Me",
          },
          value: "click_me_123",
          action_id: "button",
        },
      ],
    };
    assert.deepStrictEqual(block, expected);
  });
});
