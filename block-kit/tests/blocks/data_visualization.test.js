import * as assert from "node:assert";
import { describe, it } from "node:test";
import {
  example01,
  example02,
  example03,
  example04,
} from "../../src/blocks/data_visualization.js";

describe("data_visualization", () => {
  it("example01", () => {
    const block = example01();
    const expected = {
      type: "data_visualization",
      title: "My Favorite Candy Bars",
      chart: {
        type: "pie",
        segments: [
          { label: "Kit Kat", value: 45 },
          { label: "Twix", value: 28 },
          { label: "Crunch", value: 18 },
          { label: "Milky Way", value: 9 },
        ],
      },
    };
    assert.deepStrictEqual(block, expected);
  });

  it("example02", () => {
    const block = example02();
    const expected = {
      type: "data_visualization",
      title: "My Favorite Pies by Percentage of Tastiness",
      chart: {
        type: "bar",
        series: [
          {
            name: "Pies",
            data: [
              { label: "Strawberry Rhubarb", value: 85 },
              { label: "Pumpkin", value: 70 },
              { label: "Lemon Meringue", value: 72 },
              { label: "Blueberry", value: 90 },
              { label: "Key Lime", value: 56 },
            ],
          },
        ],
        axis_config: {
          categories: [
            "Strawberry Rhubarb",
            "Pumpkin",
            "Lemon Meringue",
            "Blueberry",
            "Key Lime",
          ],
          x_label: "Pies",
          y_label: "Percentage of Tastiness",
        },
      },
    };
    assert.deepStrictEqual(block, expected);
  });

  it("example03", () => {
    const block = example03();
    const expected = {
      type: "data_visualization",
      title: "Daily Active Users",
      chart: {
        type: "area",
        series: [
          {
            name: "Pied Piper Free Tier",
            data: [
              { label: "Mon", value: 12000 },
              { label: "Tues", value: 13500 },
              { label: "Wed", value: 15200 },
              { label: "Thurs", value: 14800 },
              { label: "Fri", value: 16400 },
            ],
          },
          {
            name: "Pied Piper Paid Tier",
            data: [
              { label: "Mon", value: 4500 },
              { label: "Tues", value: 4800 },
              { label: "Wed", value: 5100 },
              { label: "Thurs", value: 5600 },
              { label: "Fri", value: 6200 },
            ],
          },
        ],
        axis_config: {
          categories: ["Mon", "Tues", "Wed", "Thur", "Fri"],
          x_label: "Day",
          y_label: "Users",
        },
      },
    };
    assert.deepStrictEqual(block, expected);
  });

  it("example04", () => {
    const block = example04();
    const expected = {
      type: "data_visualization",
      title: "Weekly Paper Sales",
      chart: {
        type: "line",
        series: [
          {
            name: "Dunder Mifflin Infinity Website",
            data: [
              { label: "Week 1", value: 32000 },
              { label: "Week 2", value: 35000 },
              { label: "Week 3", value: 29000 },
              { label: "Week 4", value: 41000 },
              { label: "Week 5", value: 45000 },
            ],
          },
          {
            name: "Dunder Mifflin In-store",
            data: [
              { label: "Week 1", value: 32000 },
              { label: "Week 2", value: 35000 },
              { label: "Week 3", value: 29000 },
              { label: "Week 4", value: 41000 },
              { label: "Week 5", value: 45000 },
            ],
          },
        ],
        axis_config: {
          categories: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
          x_label: "Week",
          y_label: "Paper Sales (USD)",
        },
      },
    };
    assert.deepStrictEqual(block, expected);
  });
});
