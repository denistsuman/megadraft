/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";

import {
  BlockContent,
  BlockData,
  BlockInput,
  CommonBlock
} from "../../components/plugin";

import icons from "../../icons";

import ImageBlockStyle from "./ImageBlockStyle";


export default class ImageBlock extends Component {
  constructor(props) {
    super(props);

    this._handleCaptionChange = ::this._handleCaptionChange;
    this._handleRightsHolderChange = ::this._handleRightsHolderChange;
    this.renderCaptionBlock = ::this.renderCaptionBlock;
    this.renderRightsHolderBlock = ::this.renderRightsHolderBlock;

    this.actions = [
      {"key": "delete", "icon": icons.DeleteIcon, "action": this.props.container.remove}
    ];
  }

  _handleCaptionChange(event) {
    event.stopPropagation();
    this.props.container.updateData({caption: event.target.value});
  }

  _handleRightsHolderChange(event) {
    event.stopPropagation();
    this.props.container.updateData({rightsHolder: event.target.value});
  }

  renderCaptionBlock() {
    if (this.props.blockProps.editorReadOnly) {
      return (
        <p className="caption-readonly">{this.props.data.caption}</p>
      )
    } else {
      return (
        <BlockInput
          placeholder="Caption"
          value={this.props.data.caption}
          onChange={this._handleCaptionChange} />
      )
    }
  }

  renderRightsHolderBlock() {
    return (
      <BlockInput
        placeholder="Rights Holder"
        value={this.props.data.rightsHolder}
        onChange={this._handleRightsHolderChange} />
    )
  }

  render(){
    return (
      <CommonBlock {...this.props} actions={this.actions}>
        <BlockContent>
          <img style={ImageBlockStyle.image} src={this.props.data.src} alt=""/>
        </BlockContent>

        <BlockData>
          { this.renderCaptionBlock() }
          { this.props.blockProps.showDataRightsHolder && this.renderRightsHolderBlock() }
        </BlockData>
      </CommonBlock>
    );
  }
}
