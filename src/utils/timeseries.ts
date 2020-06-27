/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
/* eslint-disable max-lines-per-function */
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-node';
import { DATA_SET } from '../data/dataset';

export const trainModel = async (
  inputs,
  outputs,
  size,
  window_size,
  n_epochs,
  learning_rate,
  n_layers,
) => {
  const input_layer_shape = window_size;
  const input_layer_neurons = 100;

  const rnn_input_layer_features = 10;
  const rnn_input_layer_timesteps =
    input_layer_neurons / rnn_input_layer_features;

  const rnn_input_shape = [rnn_input_layer_features, rnn_input_layer_timesteps];
  const rnn_output_neurons = 20;

  const rnn_batch_size = window_size;

  const output_layer_shape = rnn_output_neurons;
  const output_layer_neurons = 1;

  const model = tf.sequential();

  inputs = inputs.slice(0, Math.floor((size / 100) * inputs.length));
  outputs = outputs.slice(0, Math.floor((size / 100) * outputs.length));

  const xs = tf
    .tensor2d(inputs, [inputs.length, inputs[0].length])
    .div(tf.scalar(10));

  const ys = tf
    .tensor2d(outputs, [outputs.length, 1])
    .reshape([outputs.length, 1])
    .div(tf.scalar(10));

  model.add(
    tf.layers.dense({
      units: input_layer_neurons,
      inputShape: [input_layer_shape],
    }),
  );
  model.add(tf.layers.reshape({ targetShape: rnn_input_shape }));

  const lstm_cells = [];
  for (let index = 0; index < n_layers; index++) {
    lstm_cells.push(tf.layers.lstmCell({ units: rnn_output_neurons }));
  }

  model.add(
    tf.layers.rnn({
      cell: lstm_cells,
      inputShape: rnn_input_shape,
      returnSequences: false,
    }),
  );

  model.add(
    tf.layers.dense({
      units: output_layer_neurons,
      inputShape: [output_layer_shape],
    }),
  );

  const opt_adam = tf.train.adam(learning_rate);
  model.compile({ optimizer: opt_adam, loss: 'meanSquaredError' });

  await model.fit(xs, ys, {
    batchSize: rnn_batch_size,
    epochs: n_epochs,
  });
  await model.save('file://./model-001');
};

export const predict = (inputs, model): number[] => {
  const outps = model
    .predict(
      tf.tensor2d(inputs, [inputs.length, inputs[0].length]).div(tf.scalar(10)),
    )
    .mul(10);
  return Array.from(outps.dataSync());
};

export const ComputeSMA = (dataset, window_size) => {
  const r_avgs = [];
  for (let i = 0; i <= dataset.length - window_size; i++) {
    let SMA = 0;
    for (let j = i; j < i + window_size; j++) {
      SMA += dataset[j];
    }
    r_avgs.push(SMA / window_size);
  }
  return r_avgs;
};

export const generateDataset = (dataset, window_size) => {
  const inputs = [];
  for (let i = 0; i <= dataset.length - window_size; i++) {
    const temp = [];
    for (let j = i; j < i + window_size; j++) {
      temp.push(dataset[j]);
    }
    inputs.push(temp);
  }
  return inputs;
};

export const trainData = async () => {
  const windowSize = 12;
  const inputs = generateDataset(
    DATA_SET.map((e) => e.amount),
    windowSize,
  );
  const outputs = ComputeSMA(
    DATA_SET.map((e) => e.amount),
    windowSize,
  );
  const n_epochs = 100;
  const lr_rate = 0.01;
  const n_hl = 4;
  const n_items = 90;
  await trainModel(
    inputs,
    outputs,
    n_items,
    windowSize,
    n_epochs,
    lr_rate,
    n_hl,
  );
};

export const predictData = async (): Promise<number> => {
  const inputs = generateDataset(
    DATA_SET.map((e) => e.amount),
    12,
  );
  const model = await tf.loadLayersModel('file://./model-001/model.json');
  const pred_X = [inputs[inputs.length - 1]];
  return predict(pred_X, model)[0];
};
