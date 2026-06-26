/**
 * Displays a chart that visualizes a set of data.
 *
 * The `data_visualization` block is net-new and is not yet part of the
 * published `@slack/types` definitions, so the block shape is described with
 * local typedefs below until the SDK ships a `DataVisualizationBlock` type.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/blocks/data-visualization-block/}
 */

/**
 * A single slice of a pie chart.
 *
 * @typedef {Object} DataVisualizationSegment
 * @property {string} label - The name shown for the segment.
 * @property {number} value - The numeric value of the segment.
 */

/**
 * A single data point within a series.
 *
 * @typedef {Object} DataVisualizationDataPoint
 * @property {string} label - The name shown for the data point.
 * @property {number} value - The numeric value of the data point.
 */

/**
 * A named collection of data points used by bar, area, and line charts.
 *
 * @typedef {Object} DataVisualizationSeries
 * @property {string} name - The name shown for the series.
 * @property {DataVisualizationDataPoint[]} data - The data points of the series.
 */

/**
 * Axis labels and categories used by bar, area, and line charts.
 *
 * @typedef {Object} DataVisualizationAxisConfig
 * @property {string[]} categories - The categories plotted along the x-axis.
 * @property {string} x_label - The label shown for the x-axis.
 * @property {string} y_label - The label shown for the y-axis.
 */

/**
 * The chart rendered by a data visualization block.
 *
 * @typedef {Object} DataVisualizationChart
 * @property {"pie" | "bar" | "area" | "line"} type - The kind of chart to render.
 * @property {DataVisualizationSegment[]} [segments] - The slices of a pie chart.
 * @property {DataVisualizationSeries[]} [series] - The series of a bar, area, or line chart.
 * @property {DataVisualizationAxisConfig} [axis_config] - The axes of a bar, area, or line chart.
 */

/**
 * A block that visualizes data as a chart.
 *
 * @typedef {Object} DataVisualizationBlock
 * @property {"data_visualization"} type - The type of block.
 * @property {string} title - The title shown above the chart, up to 50 characters.
 * @property {DataVisualizationChart} chart - The chart to render.
 * @property {string} [block_id] - A unique identifier for the block.
 */

/**
 * A pie chart that visualizes how segments contribute to a whole.
 *
 * @returns {DataVisualizationBlock}
 */
export function example01() {
  /**
   * @type {DataVisualizationBlock}
   */
  const block = {
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
  return block;
}

/**
 * A bar chart that compares values across categories.
 *
 * @returns {DataVisualizationBlock}
 */
export function example02() {
  /**
   * @type {DataVisualizationBlock}
   */
  const block = {
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
  return block;
}

/**
 * An area chart that visualizes multiple series over time.
 *
 * @returns {DataVisualizationBlock}
 */
export function example03() {
  /**
   * @type {DataVisualizationBlock}
   */
  const block = {
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
  return block;
}

/**
 * A line chart that compares trends across multiple series.
 *
 * @returns {DataVisualizationBlock}
 */
export function example04() {
  /**
   * @type {DataVisualizationBlock}
   */
  const block = {
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
  return block;
}
