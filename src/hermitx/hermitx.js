/* eslint-disable operator-linebreak */
/* eslint-disable dot-notation */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-else-return */
/* eslint-disable computed-property-spacing */
/* eslint-disable prefer-const */
/* eslint-disable space-unary-ops */
/* eslint-disable no-console */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
/* eslint-disable react/jsx-curly-spacing */
/* eslint-disable comma-dangle */
/* eslint-disable array-bracket-spacing */
/* eslint-disable space-in-parens */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
import "./style.scss";
import "./editor.scss";
import {
    TextControl,
    SelectControl,
    Button,
    TextareaControl,
    CheckboxControl
} from "@wordpress/components";

const { __ } = wp.i18n;
const { registerBlockType, query } = wp.blocks;

const getSongs = (t, a) => {
    let songs = "";
    switch (t) {
        case "xiami_songlist":
            (a = a.match(/(http|https):\/\/(www.)?xiami.com\/song\//gi)) &&
                0 < a.length &&
                (songs = "Wating Parse...");
            break;
        case "xiami_album":
            (a = a.match(/(http|https):\/\/(www.)?xiami.com\/album\//gi)) &&
                0 < a.length &&
                (songs = "Wating Parse...");
            break;
        case "xiami_playlist":
            (a = a.match(/(http|https):\/\/(www.)?xiami.com\/collect\//gi)) &&
                0 < a.length &&
                (songs = "Wating Parse...");
            break;
        case "netease_songlist":
            (a = a.match(/(song\?id=(\d+)|\/song\/(\d+))/gi)) &&
                0 < a.length &&
                (songs = a.join(",").replace(/(song\?id=|\/song\/)/gi, ""));
            break;
        case "netease_songs":
            (a = a.match(/song\?id=(\d+)/gi)) &&
                0 < a.length &&
                (songs = a.join(",").replace(/song\?id=/g, ""));
            break;
        case "netease_album":
            (a = a.match(/(album\?id=(\d+)|\/album\/(\d+))/i)) &&
                0 < a.length &&
                (songs = a[0].replace(/(album\?id=|\/album\/)/gi, ""));
            break;
        case "netease_playlist":
            (a = a.match(/(playlist\?id=(\d+)|\/playlist\/(\d+))/i)) &&
                0 < a.length &&
                (songs = a[0].replace(/(playlist\?id=|\/playlist\/)/gi, ""));
            break;
        case "tencent_songlist":
            (a = a.match(/y\.qq\.com\/n\/yqq\/song\/([A-Za-z0-9]+)/gi)) &&
                0 < a.length &&
                (songs = a
                    .join(",")
                    .replace(/y\.qq\.com\/n\/yqq\/song\//gi, ""));
            break;
        case "tencent_album":
            (a = a.match(/y\.qq\.com\/n\/yqq\/album\/([A-Za-z0-9]+)/i)) &&
                0 < a.length &&
                (songs = a[0].replace(/y\.qq\.com\/n\/yqq\/album\//gi, ""));
            break;
        case "tencent_playlist":
            (a = a.match(/y\.qq\.com\/n\/yqq\/playlist\/(\d+)/i)) &&
                0 < a.length &&
                (songs = a[0].replace(/y\.qq\.com\/n\/yqq\/playlist\//gi, ""));
            break;
        case "kugou_songlist":
            (a = a.match(/[A-Za-z0-9]+/gi)) &&
                0 < a.length &&
                (songs = a.join(","));
            break;
        case "kugou_album":
            (a = a.match(/[A-Za-z0-9]+/i)) && 0 < a.length && (songs = a[0]);
            break;
        case "kugou_playlist":
            (a = a.match(/[A-Za-z0-9]+/i)) && 0 < a.length && (songs = a[0]);
            break;
        case "baidu_songlist":
            (a = a.match(/music\.taihe\.com\/song\/\d+/gi)) &&
                0 < a.length &&
                (songs = a
                    .join(",")
                    .replace(/music\.taihe\.com\/song\//gi, ""));
            break;
        case "baidu_album":
            (a = a.match(/music\.taihe\.com\/album\/\d+/i)) &&
                0 < a.length &&
                (songs = a[0].replace(/music\.taihe\.com\/album\//gi, ""));
            break;
        case "baidu_playlist":
            (a = a.match(/music\.taihe\.com\/songlist\/\d+/i)) &&
                0 < a.length &&
                (songs = a[0].replace(/music\.taihe\.com\/songlist\//gi, ""));
            break;
    }
    return t + "#:" + songs;
};

registerBlockType("hermitx/music", {
    title: __("Hermit-X", "hermitx"),
    icon: "editor-contract",
    category: "common",
    keywords: [__("Hermit-X"), __("hermitx"), __("music")],
    attributes: {
        platform: {
            type: "string",
            default: "netease"
        },
        type: {
            type: "string",
            default: "songlist"
        },
        songs: {
            type: "string"
        },
        mode: {
            type: "string",
            default: "circulation"
        },
        autoplay: {
            type: "boolean",
            default: false
        },
        preload: {
            type: "string",
            default: "auto"
        },
        other: {
            type: "string",
            default: ""
        }
    },
    edit: ({ attributes, setAttributes, className }) => {
        return (
            <div className={className}>
                <SelectControl
                    label={__("平台", "hermitx")}
                    value={attributes.platform}
                    options={[
                        {
                            label: __("网易云音乐", "hermitx"),
                            value: "netease"
                        },
                        { label: __("虾米音乐", "hermitx"), value: "xiami" },
                        { label: __("腾讯音乐", "hermitx"), value: "tencent" },
                        { label: __("酷狗音乐", "hermitx"), value: "kugou" },
                        { label: __("千千音乐", "hermitx"), value: "baidu" }
                    ]}
                    onChange={val => {
                        setAttributes({ platform: val });
                    }}
                />
                <SelectControl
                    label={__("类别", "hermitx")}
                    value={attributes.type}
                    options={[
                        { label: __("单曲", "hermitx"), value: "songlist" },
                        { label: __("专辑", "hermitx"), value: "album" },
                        { label: __("歌单", "hermitx"), value: "playlist" }
                    ]}
                    onChange={val => {
                        setAttributes({ type: val });
                    }}
                />
                <TextareaControl
                    label="音乐地址"
                    placeholder="请输入音乐地址..."
                    value={attributes.songs}
                    onChange={val => setAttributes({ songs: val })}
                />
                {attributes.platform === "xiami" && (
                    <Button
                        isDefault={true}
                        onClick={() => {
                            jQuery.ajax({
                                url: window.hermit.ajax_url,
                                data: {
                                    action: "hermit",
                                    scope: attributes.platform + "_id_parse",
                                    src: attributes.songs.replace(/\n/g, ",")
                                },
                                success: function(c) {
                                    setAttributes({
                                        songs: attributes.songs.replace(
                                            "Wating Parse...",
                                            c.msg.join(",").replace(/,+$/g, "")
                                        )
                                    });
                                }
                            });
                        }}
                    >
                        解析URL
                    </Button>
                )}
                <SelectControl
                    label={__("播放模式", "hermitx")}
                    value={attributes.mode}
                    options={[
                        {
                            label: __("循环播放", "hermitx"),
                            value: "circulation"
                        },
                        { label: __("随机播放", "hermitx"), value: "random" },
                        { label: __("顺序播放", "hermitx"), value: "order" },
                        { label: __("单曲循环", "hermitx"), value: "single" }
                    ]}
                    onChange={val => {
                        setAttributes({ mode: val });
                    }}
                />
                <SelectControl
                    label={__("预加载", "hermitx")}
                    value={attributes.preload}
                    options={[
                        { label: __("自动", "hermitx"), value: "auto" },
                        { label: __("元数据", "hermitx"), value: "metadata" },
                        { label: __("无", "hermitx"), value: "none" }
                    ]}
                    onChange={val => {
                        setAttributes({ preload: val });
                    }}
                />
                <CheckboxControl
                    label={__("自动播放", "hermitx")}
                    checked={attributes.autoplay}
                    onChange={val => {
                        setAttributes({ autoplay: val });
                    }}
                />
                <TextControl
                    label="其他参数"
                    placeholder="若无需填写其他参数请留空"
                    value={attributes.other}
                    onChange={val => setAttributes({ other: val })}
                />
            </div>
        );
    },
    save: ({ attributes }) => {
        let data = {
            theme: attributes.theme,
            autoplay: attributes.autoplay,
            preload: attributes.preload,
            songs: getSongs(
                attributes.platform + "_" + attributes.type,
                attributes.songs
            ),
            other: attributes.other
        };
        // eslint-disable-next-line template-curly-spacing
        return `[hermit autoplay="${data.autoplay}" mode="${data.preload}" preload="${data.preload}" ${data.other}]${data.songs}[/hermit]`;
    }
});
