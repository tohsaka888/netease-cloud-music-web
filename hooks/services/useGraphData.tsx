import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { useCallback, useMemo } from "react";
import { EdgeProps, ExploreFunc, NodeProps } from "react-knowledge-graph";
import usePlaylistDetail from "./usePlaylistDetail";
import usePlaylistTracks from "./usePlaylistTracks";

function useGraphData() {
  const { query } = useRouter();
  const { data: detail } = usePlaylistDetail({ id: +query.id! });
  const { data: tracks } = usePlaylistTracks({
    id: +query.id!,
    page: 1,
    pageSize: 10,
  });
  const explore: ExploreFunc = useCallback(
    async (id, node) => {
      let inside: NodeProps[] = [];
      let outside: NodeProps[] = [];
      let edges: EdgeProps[] = [];
      if (node.type === "歌单") {
        inside.push(
          {
            name: detail?.playlist.creator.nickname || "",
            id: detail?.playlist.creator.userId.toString() || "",
            type: "创建者",
            hasMore: true,
            direction: "inside",
          },
          ...detail!.playlist.subscribers.map((sub) => {
            return {
              name: sub.nickname,
              id: sub.userId.toString(),
              type: "收藏者",
              hasMore: true,
              direction: "inside" as "inside",
            };
          })
        );
        outside.push(
          ...tracks!.map((track) => {
            return {
              name: track.name,
              id: track.id.toString(),
              type: "歌曲",
              hasMore: true,
              direction: "outside" as "outside",
            };
          })
        );
        edges.push(
          ...tracks!.map((track) => {
            return {
              fromId: id.toString(),
              toId: track.id.toString(),
              id: id + track.id,
              description: "包含",
            };
          }),
          ...detail!.playlist.subscribers.map((sub) => {
            return {
              fromId: sub.userId.toString(),
              toId: id,
              description: "收藏",
              id: sub.userId.toString() + id,
            };
          }),
          {
            fromId: detail?.playlist.creator.userId.toString() || "",
            toId: id.toString(),
            id: detail?.playlist.creator.userId.toString() + id,
            description: "创建",
          }
        );
      }

      if (node.type === "创建者" || node.type === "收藏者") {
        const info =
          node.type === "创建者"
            ? detail?.playlist.creator
            : detail?.playlist.subscribers.find(
                (sub) => sub.userId.toString() === node.id
              );
        outside.push(
          {
            name: info?.gender === 0 ? "女" : "男" || "",
            type: "性别",
            id: info?.userId + "gender",
            hasMore: false,
            direction: "outside",
          },
          {
            name: info?.birthday
              ? dayjs(info?.birthday).format("YYYY年MM月")
              : "用户未设置",
            type: "生日",
            id: info?.userId + "birth",
            hasMore: false,
            direction: "outside",
          },
          {
            name: info?.vipType !== 0 ? "是" : "否",
            type: "VIP",
            id: info?.userId + "vip",
            hasMore: false,
            direction: "outside",
          }
        );
        edges.push(
          {
            fromId: node.id,
            toId: info?.userId + "gender",
            id: node.id + info?.userId + "gender",
            description: "用户信息",
          },
          {
            fromId: node.id,
            toId: info?.userId + "birth",
            id: node.id + info?.userId + "birth",
            description: "用户信息",
          },
          {
            fromId: node.id,
            toId: info?.userId + "vip",
            id: node.id + info?.userId + "vip",
            description: "用户信息",
          }
        );
      }

      if (node.type === "歌曲") {
        const song = tracks!.find((track) => track.id.toString() === node.id);
        inside.push(
          {
            name: song!.al.name,
            type: "专辑",
            id: song!.al.id.toString(),
            hasMore: false,
            direction: "inside" as "inside",
          },
          ...song!.ar.map((ar) => {
            return {
              name: ar.name,
              type: "歌手",
              id: ar.id.toString() + id,
              hasMore: false,
              direction: "inside" as "inside",
            };
          })
        );
        edges.push(
          {
            fromId: song!.al.id.toString(),
            toId: id,
            description: "创作",
            id: song?.al.id + id,
          },
          ...song!.ar.map((ar) => {
            return {
              fromId: ar.id.toString() + id,
              toId: id,
              description: "包含",
              id: ar.id + id,
            };
          })
        );
      }
      return {
        inside: inside,
        outside: outside,
        edges: edges,
      };
    },
    [tracks, detail]
  );

  return { explore };
}

export default useGraphData;
